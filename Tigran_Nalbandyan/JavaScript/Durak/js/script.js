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
// Debil lezu
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

    this.checkTakeCards = function() {
        if (this.playerCards.length < 6) {
            const status = this.takeCard();
            if (status) {
                return this.checkTakeCards();
            }
        } else {
            return 1;
        }
    }

    this.checkPlayableCards = function(tableCards) {
        function checkCardValueOnTable(playerCard) {
            for (const tableCard of tableCards) {
                if (tableCard.name.split(' ')[1] == playerCard.name.split(' ')[1]) {
                    return true;
                }
            }
            return false;
        }

        this.playableCards = [];

        if (tableCards.length === 0) {
            if (game.state.attack.id === this.id) {
                this.playableCards = this.playerCards;
                return this.playableCards;
            } else {
                return [];
            }
        }
        const attacker = game.state.attack.id === this.id;
        for (const playerCard of this.playerCards) {
            if ((attacker && checkCardValueOnTable(playerCard)) || (!attacker && (playerCard.suit === tableCards[tableCards.length - 1].suit || playerCard.suit === this.game.trump.suit) && parseInt(playerCard.value) > parseInt(tableCards[tableCards.length - 1].value))) {
                this.playableCards.push(playerCard);
            }
        }
        if (this.playableCards.length === 0) {
            if (this.id === 2) {
                if (attacker) {
                    this.game.clearTableCards(this);
                } else {
                    if (this.playerCards.length === 0) {
                        this.game.clearTableCards(this, true);
                    } else {
                        this.takeTableCards();
                    }
                }
            }
        }

        console.log(this.id, this.playableCards);
        return this.playableCards;
    }

    this.takeCard = function() {
        // sleep(500); Debil lezu
        try {
            const card = this.game.getRandomCard(this.game.cards);
            this.playerCards.push(card);
            this.game.drawCardsCount();
            return 1;
        } catch (e) {
            return 0;
        }
    }

    this.takeTableCards = function() {
        if (game.state.cover.id === this.id) {
            this.playerCards = this.playerCards.concat(this.game.tableCards);
            this.game.tableCards.length = 0;
            this.game.state.attack.checkTakeCards();
            this.game.nextStep();
        } else {
            alert(`Can't take cards. Click "To trash" to remove cards on the table.`);
        }
    }
}

class Card {
    constructor(suit, value, name) {
        this.suit = suit;
        this.value = value;
        this.name = name;
    }
}

function Game() {
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

    this.clearTableCards = function(player, hard=false) {
        if (this.state.attack.id === player.id || hard) {
            this.tableCards.length = 0;
            this.drawTable(this.tableCards);
            this.nextStep(true);
        } else {
            alert(`Can't clear the table. Click "Take" to take cards from the table.`);
        }
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
        let relative = false;
        for (const card of tableCards) {
            if (relative === true) {
                const cardCopy = card.node.cloneNode(true);
                cardCopy.classList.add('card-relative');
                table.appendChild(cardCopy);
            } else {
                table.appendChild(card.node.cloneNode(true));
            }
            relative = !relative;
        }
    }

    this.swapTurn = function() {
        if (this.state.turn === 0) {
            this.state.turn = 1;
        } else {
            this.state.turn = 0;
        }
    }

    this.swapPlayerState = function() {
        [this.state.attack, this.state.cover] = [this.state.cover, this.state.attack];
    }

    this.makeMove = function() {
        // Computer makes move
        const playableCards = this.player2.checkPlayableCards(this.tableCards);
        for (let card of this.player2.playableCards) {
            this.tableCards.push(card);
            this.drawTable(this.tableCards);
            this.removeFromCards(card.node, this.player2.playerCards);
            card.node.remove();

            break;
        }
        this.nextStep();
    }

    this.clickCard = function(card) {
        const table = document.getElementById('table');
        if (this.state.turn === 0) {
            const playableCards = this.player1.checkPlayableCards(this.tableCards);
            const playableCard = this.checkCardInPlayableCards(card, playableCards);
            if (playableCard) {
                this.tableCards.push(playableCard);
                this.drawTable(this.tableCards);
                this.removeFromCards(card, this.player1.playerCards);
                card.remove();

                this.nextStep();
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
        this.drawTable(this.tableCards);
    }

    this.drawCardsCount = function() {
        const span = document.getElementById('cards-count');
        span.textContent = `Cards left: ${this.cards.length}`;
    }

    this.end = function() {
        // Tigran always wins!!! :D
        console.log('Tigran WINS!');
        alert('Tigran WINS!')
        return 1;
    }

    this.run = function() {
        this.player1 = new Player(1, this);
        this.player2 = new Player(2, this);

        const suits = ["♠", "♥", "♦", "♣"];
        const values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
        this.cards = [];
        for (const suit of suits) {
            for (const value of values) {
                this.cards.push(new Card(suit, value, `${suit} ${value}`));
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
        this.drawCardsCount();

        this.state = {
            'turn': 0,
            'attack': this.player1,
            'cover': this.player2,
        }

        document.getElementById('button-trash').addEventListener('click', this.clearTableCards.bind(this, this.player1));
        document.getElementById('button-take').addEventListener('click', this.player1.takeTableCards.bind(this.player1));
    }

    this.nextStep = function(swapPlayerStateBool) {
        this.drawCards();
        this.swapTurn();
        if (swapPlayerStateBool) {
            this.state.attack.checkTakeCards();
            this.state.cover.checkTakeCards();
            this.swapPlayerState();
        }
        console.log('swaped')

        if (this.state.turn === 1) {
            setTimeout(this.makeMove.bind(this), 1000);
        }
    }
}

game = new Game();
console.log(game.player1);
game.run();