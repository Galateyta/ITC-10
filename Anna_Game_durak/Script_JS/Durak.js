const cards = {
    suits: ['Spades', 'Hearts', 'Diamonds', 'Clubs'],
    values: ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
};
let deck = new Array();
let players = new Array();
let currentPlayer = 0;
const lenValues = cards.values.length;
const lenSuits = cards.suits.length;

function createDeck() {
    deck = new Array();
    for (let i = 0 ; i < lenValues; i++) {
        for (let j = 0; j < lenSuits; j++) {
            let weight = parseInt(cards.values[i]);
            if (cards.values[i] == 'J' || cards.values[i] == 'Q' || cards.values[i] == 'K') {
                weight = 6;
            }
            if (cards.values[i] == 'A') {
                weight = 7;
            }
            this.card = { 
                Value: cards.values[i], 
                Suit: cards.suits[j], 
                Weight: weight 
            };
            deck.push(card);
        }
    }
}

function createPlayers(num) {
    players = new Array();
    for(let i = 1; i <= num; i++) {
        let hand = new Array();
        this.player = { 
            Name: 'Player ' + i, 
            ID: i, 
            Hand: hand 
        };
        players.push(player);
    }
}

function createPlayersUI() {
    document.getElementById('players').innerHTML = '';
    for(let i = 0; i < players.length; i++) {
        const div_player = document.createElement('div');
        const div_playerid = document.createElement('div');
        const div_hand = document.createElement('div');

        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = 'Player ' + players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        document.getElementById('players').appendChild(div_player);
    }
}

function shuffle() {
    for (let i = 0; i < 1000; i++) {
        this.location1 = Math.floor((Math.random() * deck.length));
        this.location2 = Math.floor((Math.random() * deck.length));
        this.tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startDurak() {
    document.getElementById('status').style.display = 'none';
    // deal 6 cards to every player object
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    //dealCozir();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

function dealHands() {
    // alternate handing cards to each player
    // 6 cards each
    for(let i = 0; i < 6; i++) {
        for (let x = 0; x < players.length; x++) {
            this.card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
        }
    }
    updateDeck();
}

function dealCozir() {
    const length = deck.length;
    const indexCoser = Math.floor(Math.random() * length);
    [deck[length - 1], deck[indexCoser]] = [deck[indexCoser], deck[length - 1]];
    document.getElementById('cozir').appendChild(getCardUI(deck[length - 1])); 
    updateDeck();  
  }

function winner() {
    currentPlayer = 0;
    const win = document.getElementById('win');
    this.sizeCards = document.getElementById('player_' + currentPlayer).length;
    while (currentPlayer < players.length) {
        if (sizeCards === 0) {
            win.textContent = 'Winner!';
            currentPlayer += 1;
        }
    }
}

const goNextStep = function (deck, player1, player2) {
    const maxCount = 12;
    if (deck.length < maxCount) {
        if (player1.name !== currentPlayer.name) {
            if (player1.coverCard(deck)) {
                player1.goCard(deck);
            } else {
                player1.card = player1.card.concat(deck);
                deck = [];
            }
        } else {
        if (player2.coverCard(card)) {
            player2.goCard(card);
        } else {
            player2.cards = player2.cards.concat(deck);
            deck = [];
        }
      }
    } else {
        deck = [];
        if (player1 != currentPlayer) {
            currentPlayer = player1;
        } else {
            currentPlayer = player2;
        }
    }
    return deck === [] && (player1.cards === [] || player2.cards === []);
}

let coverCard = function (deck) {
    const tableCards = game.state.deck;
    if (deck.values > tableCards[tableCards.length - 1].values && deck.suits === tableCards[tableCards.length - 1].suits) {
        return true;
    }
    return false;
}

let goCard = function() {
    //
}

function Play() {
    //for playing
    this.beaten = function() {

    }
    this.take = function() {
        ths.newCard = new Array();
        newCard.push(currentPlayer.cards.suits[1]);
    }
    for (let i in cards) {
        if (currentPlayer[i].cards.suits[i] === currentPlayer[i + 1].cards.suits[i]) {
            if (currentPlayer[i].cards.values[i] > currentPlayer[i + 1].cards.values[i]) {
                beaten();
            } else {
                take();
            }
        } else if (dealCozir(currentPlayer[i].cards.suits[i])) {
            beaten();
        } else {
            take();
        }
    }
}

function renderCard(card, player) {
    const hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

function getCardUI(card) {
    const el = document.createElement('div');
    this.icon = '';
    if (card.Suit === 'Hearts')
    icon='&hearts;';
    else if (card.Suit === 'Spades')
    icon = '&spades;';
    else if (card.Suit === 'Diamonds')
    icon = '&diams;';
    else
    icon = '&clubs;';
    el.className = 'card';
    el.innerHTML = card.Value + '<br/>' + icon;
    return el;
}

function hitMe() {
    this.card = deck.pop();
    if(players.length < 6) {
        players[currentPlayer].Hand.push(card);
        renderCard(card, currentPlayer);
    }
    updateDeck();
}

function stay() {
    // move on to next player, if any
    if (currentPlayer !== players.length - 1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    }
}

function updateDeck() {
    document.getElementById('deckcount').innerHTML = deck.length;
}

window.addEventListener('load', function(){
    createDeck();
    shuffle();
    createPlayers(1);
});









