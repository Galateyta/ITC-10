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

function draw (player1, player2, trump) {
	const divPlayer1 = document.getElementById('player-1');
	const length = player1.playerCards.length;
	for (let i = 0; i < length; i++) {
		let card = document.createElement('div');
		card.className = 'card';
		divPlayer1.appendChild(card);
	}

	//TODO draw for player 2 and trump
}

function game() {
    let player1 = new Player(1);
    let player2 = new Player(2);

    let cards = ["s1", "h1", "d1", "c1", "s6", "h6", "d6", "c6", "s7", "h7", "d7", "c7", "s8", "h8", "d8", "c8", "s9", "h9", "d9", "c9", "s10", "h10", "d10", "c10", "s11", "h11", "d11", "c11", "s12", "h12", "d12", "c12", "s13", "h13", "d13", "c13"];
    const trump = getTrump(cards);

    player1.playerCards = getSixCards(cards);
    player2.playerCards = getSixCards(cards);

    draw(player1, player2, trump);

    // implement game running
}