function Card(value, suit){
    this.value = value;
    this.suit = suit;
    this.name = () => {return this.value + 'of' + this.suit};
}

function Deck(){
    this.deck = [];
    this.createDeck = function() {
        const values = ['A', 6, 7, 8, 9, 10,  'J', 'Q', 'K'];
        const suits =  ['Clubs', 'Diamonds', 'Hears', 'Spades'];
        const sLen = suits.length;
        const vLen = values.length;
        for (let i = 0; i < sLen; i++) {
            for (let j = 0; j < vLen; j++) {
                this.deck.push(`${values[j]} of ${suits[i]}`);
            }
        }
        return this.deck;
    };
    this.shuffle = function() {
        let n;
        const dLen = deck.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < this.dLen; j++) {
                k = Math.floor(Math.random() * this.dLen);
                let temp = this.deck[j];
                this.deck[j] = this.deck[k];
                this.deck[k] = temp;
            }
        }
    };
}

function Player(name){
    this.name = name;
    this.cards = [];
    this.go = function(){
        //TODO
    };
    this.answer = function(){
        //TODO
    }
    this.out = function(){
        //TODO
    };
}
function Game(){
    this.deck = new Deck();
    this.players = [];
    this.status = function(){
        //TODO
    }

}
