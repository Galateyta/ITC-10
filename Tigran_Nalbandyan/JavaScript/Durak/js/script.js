// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function Player(id, game) {
    this.id = id;
    this.name = '';
    this.game = game;

    this.playerCards = [];
    this.playableCards = [];

    this.checkPlayableCards = function(tableCards) {
        this.playableCards = [];

        for (const playerCard of this.playerCards) {
            if (tableCards.length === 0 || ((playerCard.suit === tableCards[0].suit || playerCard.suit === this.game.trump.suit) && parseInt(playerCard.value) > parseInt(tableCards[tableCards.length - 1].value))) {
                this.playableCards.push(playerCard);
            } else {
                console.log(playerCard);
            }
        }
        if (this.playableCards.length === 0) {

            this.takeCard();
            return this.checkPlayableCards(tableCards);
        }


        return this.playableCards;
    }

    this.takeCard = function() {
        // sleep(500); 
        const card = this.game.getRandomCard(this.game.cards);
        this.playerCards.push(card);
        // this.game.drawPlayerCards(this);
        this.game.drawCards();
    }
}

function Game() {
    this.run = function() {
        this.player1 = new Player(1, this);
        this.player2 = new Player(2, this);

        const suits = ["♠", "♥", "♦", "♣"];
        const values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
        this.cards = [];
        for (const suit of suits) {
            for (const value of values) {
                this.cards.push({
                    'suit': suit,
                    'value': value,
                    'name': `${suit} ${value}`,
                });
            }
        }
        shuffle(this.cards);

        console.log(this.cards);
        for (let card of this.cards) {
            card.value = this.changeValue(card.suit, card.value, this.cards[this.cards.length - 1].suit);
        }

        this.tableCards = [];

        this.trump = this.getRandomCard(this.cards);
        this.player1.playerCards = this.getSixCards(this.cards);
        this.player2.playerCards = this.getSixCards(this.cards);

        this.drawCards();

        this.turn = 1;

        document.getElementById('button-trash').addEventListener('click', this.clearTableCards.bind(this));
    }

    // this.getRandomItem = function(items) {
    //     return items[Math.floor(Math.random() * items.length)]
    // }

    this.changeValue = function(suit, value, trumpSuit) {
        let newValue;
        switch (value) {
            case 'J':
                newValue = '11';
                break
            case 'Q':
                newValue = '12';
                break
            case 'K':
                newValue = '13';
                break
            case 'A':
                newValue = '14';
                break
            default:
                newValue = value;
        }
        if (suit == trumpSuit) {
            newValue = (parseInt(newValue) + 9).toString();
        }
        return newValue;
    }

    this.clearTableCards = function() {
        this.tableCards = [];
        this.drawTable(this.tableCards);
    }

    this.getRandomCard = function(cards) {
        console.log(cards.length)
            // const card = getRandomItem(cards);
        if (cards.length) {
            const card = cards.pop();
            // cards.remove(cards.indexOf(card));

            return card;
        } else {
            window.game.end();
        }
    }

    this.getSixCards = function(cards) {
        const arr = [];
        for (let i = 0; i < 6; i++) {
            const card = this.getRandomCard(cards);
            arr.push(card)
        }

        return arr;
    }

    this.drawTable = function(tableCards) {
        const table = document.getElementById('table');
        this.removeChildren(table);
        for (const card of tableCards) {
            table.appendChild(card.node.cloneNode(true));
        }
    }

    this.makeMove = function() {
        // Computer makes move
        const playableCards = this.game.player2.checkPlayableCards(this.game.tableCards);
        for (let card of this.game.player2.playerCards) {
            if (playableCards.indexOf(card) != -1) {
                this.game.tableCards.push(card);
                this.game.drawTable(this.game.tableCards);
                this.game.removeFromCards(card.node, this.game.player2.playerCards);
                card.node.remove();
                this.game.turn = 1;

                break;
            }
        }
        this.game.player1.checkPlayableCards(this.game.tableCards);
    }

    this.clickCard = function(card) {
        const table = document.getElementById('table');
        if (this.turn === 1) {
            const playableCards = this.player1.checkPlayableCards(this.tableCards);
            console.log(playableCards);
            const playableCard = this.checkCardInPlayableCards(card, playableCards);
            if (playableCard) {
                this.tableCards.push(playableCard);
                this.drawTable(this.tableCards);
                this.removeFromCards(card, this.player1.playerCards);
                card.remove();

                this.turn = 2;

                setTimeout(this.makeMove, 1000, table);
            }
        }
    }

    this.checkCardInPlayableCards = function(card, playableCards) {
        for (const playableCard of playableCards) {
            if (playableCard.node == card) {
                return playableCard;
            }
        }
        return false;
    }

    this.removeFromCards = function(card, cards) {
        for (let _card of cards) {
            if (_card.node == card) {
                cards.remove(cards.indexOf(_card));
            }
        }
    }

    this.removeChildren = function(node) {
        // removes all children
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    this.drawPlayerCards = function(player) {
        const divPlayer1 = document.getElementById(`player-${player.id}`);
        // delete all children to redraw
        this.removeChildren(divPlayer1);

        const length = player.playerCards.length;
        for (let i = 0; i < length; i++) {
            const card = document.createElement('div');
            card.className = 'card';

            card.addEventListener('click', () => this.clickCard(card));

            const span = document.createElement('span');
            span.textContent = player.playerCards[i].name;
            card.appendChild(span);
            divPlayer1.appendChild(card);

            player.playerCards[i].node = card;
        }
    }

    this.drawTrump = function(trump) {
        const card = document.getElementById('trump');
        this.removeChildren(card);
        const span = document.createElement('span');
        span.textContent = trump.name;
        card.appendChild(span);
    }

    this.drawCards = function() {
        this.drawPlayerCards(this.player1);
        this.drawPlayerCards(this.player2);
        this.drawTrump(this.trump);
    }

    this.end = function() {
        // Tigran always wins!!! :D
        console.log('Tigran WINS!');
        alert('Tigran WINS!')
        return 1;
    }
}

game = new Game();
console.log(game.player1);
game.run();