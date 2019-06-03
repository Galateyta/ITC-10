const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = new Array();
let players = new Array();
let currentPlayer = 0;
const lenValues = values.length;
const lenSuits = suits.length;

function createDeck() {
    deck = new Array();
    for (let i = 0 ; i < lenValues; i++) {
        for(let j = 0; j < lenSuits; j++) {
            let weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
                weight = 10;
            }
            if (values[i] == "A") {
                weight = 11;
            }
            const card = { 
                Value: values[i], 
                Suit: suits[j], 
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
        const player = { 
            Name: 'Player ' + i, ID: i, 
            Points: 0, 
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
        const location1 = Math.floor((Math.random() * deck.length));
        const location2 = Math.floor((Math.random() * deck.length));
        let tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startDurak() {
    // document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display="none";
    // deal 6 cards to every player object
    currentPlayer = 0;
    createDeck();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    dealHands();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

function dealHands() {
    // alternate handing cards to each player
    // 6 cards each
    for(let i = 0; i < 6; i++) {
        for (let x = 0; x < players.length; x++) {
            const card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
        }
    }
    updateDeck();
}

function renderCard(card, player) {
    const hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

function getCardUI(card) {
    const el = document.createElement('div');
    let icon = '';
    if (card.Suit == 'Hearts')
    icon='&hearts;';
    else if (card.Suit == 'Spades')
    icon = '&spades;';
    else if (card.Suit == 'Diamonds')
    icon = '&diams;';
    else
    icon = '&clubs;';
    el.className = 'card';
    el.innerHTML = card.Value + '<br/>' + icon;
    return el;
}

function hitMe() {
    const card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updateDeck();
}

function stay() {
    // move on to next player, if any
    if (currentPlayer != players.length-1) {
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