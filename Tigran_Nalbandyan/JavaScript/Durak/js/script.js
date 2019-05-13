// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

function Player(id) {
    this.id = id;
    this.name;

    this.playerCards;

}

function getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)]
}

function getTrump(cards) {
    const trump = getRandomItem(cards);
    cards.remove(cards.indexOf(trump));

    return trump;
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

function drawPlayerCards(player) {
    const divPlayer1 = document.getElementById(`player-${player.id}`);
    const length = player.playerCards.length;
    for (let i = 0; i < length; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        let span = document.createElement('span');
        span.textContent = player.playerCards[i];
        card.appendChild(span);
        divPlayer1.appendChild(card);
    }
}

function drawTrump(trump) {
    const card = document.getElementById('trump');
    let span = document.createElement('span');
    span.textContent = trump;
    card.appendChild(span);
}

function drawCards(player1, player2, trump) {
    drawPlayerCards(player1);
    drawPlayerCards(player2);
    drawTrump(trump);
}

function game() {
    let player1 = new Player(1);
    let player2 = new Player(2);

    let cards = ["♠ A", "♥ A", "♦ A", "♣ A", "♠ 6", "♥ 6", "♦ 6", "♣ 6", "♠ 7", "♥ 7", "♦ 7", "♣ 7", "♠ 8", "♥ 8", "♦ 8", "♣ 8", "♠ 9", "♥ 9", "♦ 9", "♣ 9", "♠ 10", "♥ 10", "♦ 10", "♣ 10", "♠ J", "♥ J", "♦ J", "♣ J", "♠ Q", "♥ Q", "♦ Q", "♣ Q", "♠ K", "♥ K", "♦ K", "♣ K"];
    const trump = getTrump(cards);

    player1.playerCards = getSixCards(cards);
    player2.playerCards = getSixCards(cards);

    drawCards(player1, player2, trump);

		
}

game()