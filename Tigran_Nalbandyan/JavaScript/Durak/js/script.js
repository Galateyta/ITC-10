// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function Player(id) {
    this.id = id;
    this.name = '';

    this.playerCardsElements = [];
    this.playerCards = [];
    this.playableCards = [];

    this.checkPlayableCards = function(tableCards) {
        this.syncCards();
        this.playableCards = [];
        if (tableCards.length === 0) {
            this.playableCards = this.playerCards;
        } else {
            for (let card of this.playerCards) {
                if (card.split(' ')[0] === tableCards[0].textContent.split(' ')[0]) {
                    this.playableCards.push(card);
                }
            }
        }
        return this.playableCards;
    }

    this.syncCards = function() {
        this.playerCards = [];
        for (const card of this.playerCardsElements) {
            this.playerCards.push(card.textContent);
        }
    }
}

function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)]
}

function getRandomCard(cards) {
    const card = getRandomItem(cards);
    cards.remove(cards.indexOf(card));

    return card;
}

function getSixCards(cards) {
    const arr = [];
    for (let i = 0; i < 6; i++) {
        let card = getRandomItem(cards);
        arr.push(card)
        cards.remove(cards.indexOf(card));
    }

    return arr;
}

function makeMove(table) {
    // Computer makes move
    const playableCards = this.game.player2.checkPlayableCards(table.children);
    // TODO :  if no playableCards => get 1 card
    for (let card of this.game.player2.playerCardsElements) {
        if (playableCards.indexOf(card.textContent) != -1) {
            table.appendChild(card.cloneNode(true));
            this.game.player2.playerCardsElements.remove(this.game.player2.playerCardsElements.indexOf(card));
            card.remove();
            this.game.turn = 1;

            break
        }
    }
}

function clickCard(card) {
    const table = document.getElementById('table');
    if (this.game.turn === 1) {
        const playableCards = this.game.player1.checkPlayableCards(table.children);
        console.log(playableCards);
        if (playableCards.indexOf(card.textContent) != -1) {
            table.appendChild(card.cloneNode(true));
            this.game.player1.playerCardsElements.remove(this.game.player1.playerCardsElements.indexOf(card));
            card.remove();

            this.game.turn = 2;

            setTimeout(makeMove, 1000, table);
        }
    }
}

function drawPlayerCards(player) {
    const divPlayer1 = document.getElementById(`player-${player.id}`);
    const length = player.playerCards.length;
    for (let i = 0; i < length; i++) {
        const card = document.createElement('div');
        card.className = 'card';

        card.addEventListener('click', function() {
            clickCard(this);
        });

        const span = document.createElement('span');
        span.textContent = player.playerCards[i];
        card.appendChild(span);
        divPlayer1.appendChild(card);

        player.playerCardsElements.push(card);
    }
}

function drawTrump(trump) {
    const card = document.getElementById('trump');
    const span = document.createElement('span');
    span.textContent = trump;
    card.appendChild(span);
}

function drawCards(player1, player2, trump) {
    drawPlayerCards(player1);
    drawPlayerCards(player2);
    drawTrump(trump);
}

function Game() {
    this.player1 = new Player(1);
    this.player2 = new Player(2);

    this.cards = ["♠ A", "♥ A", "♦ A", "♣ A", "♠ 6", "♥ 6", "♦ 6", "♣ 6", "♠ 7", "♥ 7", "♦ 7", "♣ 7", "♠ 8", "♥ 8", "♦ 8", "♣ 8", "♠ 9", "♥ 9", "♦ 9", "♣ 9", "♠ 10", "♥ 10", "♦ 10", "♣ 10", "♠ J", "♥ J", "♦ J", "♣ J", "♠ Q", "♥ Q", "♦ Q", "♣ Q", "♠ K", "♥ K", "♦ K", "♣ K"];

    this.run = function() {
        this.trump = getRandomCard(this.cards);
        this.player1.playerCards = getSixCards(this.cards);
        this.player2.playerCards = getSixCards(this.cards);

        drawCards(this.player1, this.player2, this.trump);

        this.turn = 1;
    }
}

game = new Game();
console.log(game.player1);
game.run();