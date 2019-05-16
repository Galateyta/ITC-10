const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const masts = ['♠', '♥', '♦', '♣'];
const initCards = function () {
    const cards = [];
    values.forEach((value) => {
        masts.forEach((mast) => {
            cards.push(new Card(mast, value));
        })
    });
    return cards;
}

const shuffle = function (cards) {
    let length = cards.length
    for (let i = 0; i < length; i++) {
        i = Math.floor(Math.random() * length--);
        [cards[length], cards[i]] = [cards[i], cards[length]];
    }
    return cards;
}

const getPlayerCards = function (cards, count) {
    const kalod = cards.slice(0, count);
    cards.splice(0, count);
    return kalod;
}
const getCoser = function (cards) {
    const length = cards.length;
    const indexCoser = Math.floor(Math.random() * length);
    [cards[length - 1], cards[indexCoser]] = [cards[indexCoser], cards[length - 1]];
    return cards[length - 1];
}

const getFirstPlayer = function (player1, player2, coser) {
    function checkAdult(card) {
        return (card.mast === coser.mast);
    }
    let cosers1 = player1.cards.filter(checkAdult);
    let cosers2 = player2.cards.filter(checkAdult);
    let count1 = cosers1.length;
    let count2 = cosers2.length;
    let min1 = 0;
    let min2 = 0;
    if (count1 === 0) {
        return player2;
    } else if (count2 === 0) {
        return player1;
    } else {
        let n = Math.max(count1, count2);
        for (let i = 0; i < n; ++i) {
            min1 = Math.min(cosers1[i], cosers1[i + 1]);
            min2 = Math.min(cosers2[i], cosers2[i + 1]);
        }
    }
    return (min1 > min2) ? player2 : player1;
}

const Game = function () {
    const count = 6;
    this.cards = [];
    this.state = {
        currentPlayer: {},
        attackingPlayer: '',
        cards: []
    };
    this.player1 = new Player('Player1', 1);
    this.player2 = new Player('Player2', 2);
    this.cards = initCards();
    this.cards = shuffle(this.cards);
    this.player1.cards = getPlayerCards(this.cards, count);
    this.player2.cards = getPlayerCards(this.cards, count);
    this.coser = getCoser(this.cards);
    this.state.currentPlayer = getFirstPlayer(this.player1, this.player2, this.coser);
    this.goNextStep = function (card, player1, player2) {
        const maxCount = 12;
        this.state.cards = this.cards;
        if (this.state.cards.length < maxCount) {
            if (player1.name !== this.state.currentPlayer.name) {
                if (player1.coverCard(card)) {
                    player1.goCard(card);
                } else {
                    player1.cards = player1.cards.concat(this.state.cards);
                    this.state.cards = [];
                }
            } else {
                if (player2.coverCard(card)) {
                    player2.goCard(card);
                } else {
                    player2.cards = player2.cards.concat(this.state.cards);
                    this.state.cards = [];
                }
            }
        } else {
            this.state.cards = [];
            if (player1 != this.state.currentPlayer) {
                this.state.currentPlayer = player1;
            } else {
                this.state.currentPlayer = player2;
            }
        }
    }
}
const Player = function (name, id) {
    this.id = id;
    this.cards = [];
    this.name = name;
    this.state = true;
    this.goCard = function (card) {
        if (game.state.attackingPlayer !== this.name) {
            return false;
        } else {
            if (game.state.cards.length === 0) {
                goNextStep()
            } else {
                function checkValue(player) {
                    return (player.card.value === card.value);
                }
                if (player1.filter(checkValue).length > 0) {
                    goNextStep();
                }
            }
            return false;
        }
    }
    this.coverCard = function (card) {
        if (game.state.attackingPlayer === this.name) {
            return false;
        } else {
            const tableCards = game.state.cards;
            if (card.value > tableCards[tableCards.length - 1].value && card.mast === tableCards[tableCards.length - 1].mast) {
                goNextStep(card);
            }
            return false;
        }
    }
}
const Card = function (mast, value) {
    this.mast = mast;
    this.value = value;
    this.name = () => {
        return `${value} of ${mast}`
    };
}
const game = new Game();
console.log(game.cards);
console.log(game.player1.cards);
console.log(game.player2.cards);
console.log(game.coser);
console.log(game.state.currentPlayer);
let drawPlayerCards = function (player) {
    const divPlayer1 = document.getElementById(`player-${player.id}`)
    const length = player.cards.length;
    for (let i = 0; i < length; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => this.clickCard(card));
        const span = document.createElement('span');
        span.textContent = player.cards[i].name();
        card.appendChild(span);
        divPlayer1.appendChild(card);
        player.cards[i].node = card;
    }
}
let drawTrump = function (trump) {
    const card = document.getElementById('trump');
    const span = document.createElement('span');
    span.textContent = trump.name();
    card.appendChild(span);
}
drawPlayerCards(game.player1);
drawPlayerCards(game.player2);
drawTrump(game.coser);
let go = game.goNextStep(game.state.currentPlayer.cards[0], game.player1, game.player2);
document.getElementById('button-go').addEventListener('click', go);