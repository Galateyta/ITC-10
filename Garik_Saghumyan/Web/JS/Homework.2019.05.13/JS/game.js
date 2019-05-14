
class Card {
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
}

class Deck {
    constructor() {
        this.deck = [];
        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        for (let suit in suits) {
            for (let value in values) {
              const card = new Card(values[value], suits[suit]);
              this.deck.push(card);
            }
        }         
    }
   
    shuffle(){
        const deck  = this.deck;
        let m = deck.length
        for ( let i = 0; i < m; i++ ){
            i = Math.floor(Math.random() * m--);
            [ deck[m], deck[i]] = [deck[i], deck[m]];
        }
        return this.deck;
    }
    deal(){
        return this.deck.pop();
    }

}

class Player {
    constructor (id){
        this.id = id;
    }
    playerCards(){
        this.pldeck = new Deck();
        this.shuffledDeck = this.pldeck.shuffle();
        this.plCards = [];
        for (let i = 0; i < 6; i++){
            const card = this.shuffledDeck.pop();
            this.plCards.push(card);
        }
        this.pldeck = this.shuffledDeck;
        return this.plCards;
    }
}
class Game {
    constructor(){
        this.player1 = new Player(1);
        this.player2 = new Player(2);
        this.deck = new Deck();
    }
}


const game = new Game();
console.log(game.player1.playerCards());
console.log(game.player2.playerCards());
