'use strict'

let step = true;//um hertna
let cardId = 0;
const CardStandartSize = 6;

const cardSection = document.getElementsByClassName('cardSection');

function valueGenerator() { 
	let cardValue = [6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 'V', 'V', 'V', 'V', 'D', 'D', 'D', 'D', 'K', 'K', 'K', 'K', 'T', 'T', 'T', 'T']; 
	let result; 
	const charactersLength = cardValue.length; 
	const index = (Math.floor(Math.random() * charactersLength));
	result = cardValue[index];
	cardValue.splice(index, 1) ;
	return result ;
} 
function holderGenerator() { 
	const cardHolder = ['cross', 'heart', 'diamond', 'spades'];
	let result = ''; 
	const charactersLength = cardHolder.length; 
	const index = (Math.floor(Math.random() * charactersLength));
	result = cardHolder[index];
	return result ;
} 
function Card () {
	this.holder = holderGenerator();
	this.value = valueGenerator();
	this.id = cardId;
}
function createCard() {
	cardId++;
	return new Card();
}

function Game (player11, player22) {
	const cardsSize = 36;
	const cardsCalod = [];
	const player1 = player11;
	const player2 = player22;
	let cozyr;
	this.initializationCalod = function () {	
		for(let i = 0; i < cardsSize; ++i) {
			const carentCard = createCard();
			let isTrue = true;
			cardsCalod.forEach(function(item){
				if(item.holder === carentCard.holder && item.value === carentCard.value) {
					isTrue = false;
				}
			});
			isTrue === true ? cardsCalod[i] = carentCard : i--;
		}
		cozyr = cardsCalod.pop();
	}
	//karcum em petq chi mka xarna generaxrel skzbum arden-------------------------------???????????
	// this.shuffle = function() {
	//     for (let i = this.cardsCalod.length - 1; i > 0; i--) {
	//         let j = Math.floor(Math.random() * (i + 1));
	//         let temp = this.cardsCalod[i];
	//         this.cardsCalod[i] = this.cardsCalod[j];
	//         this.cardsCalod[j] = temp;
	//     }
	//     return this.cardsCalod;
	// }

	this.giveCard = function (player) {
		player.playerCards.push(cardsCalod.pop());
	}
	// this.returnCalod = function() {
	// 	return cardsCalod ;
	// }
}

function Player (playerName, comd) {
	const name = playerName;
	this.playerCards = [];
	this.comdition = comd;//kargavichak (cackoxn es te gnacox@)
	this.paintPlayerCards = function () {
		for(let i = 0; i < CardStandartSize; ++i) {
			const cardItem = paintCard(this.playerCards[i]);
			name === 'player1' ? cardSection[0].appendChild(cardItem) : cardSection[2].appendChild(cardItem);
		}
	}
	// this.play = function() {
}

function cardClick (e) {
	const cardInHtml = e.target; 
 	const id = cardInHtml.id;
 	const cardInJs = document.getElementById(e.target.id);
	cardSection[1].appendChild(cardInJs);
 	//if(id.parentElement.id === p1-section comdition ===1 ) gnacoxn es voch te cackox@
 	const divPlayer1 = document.createElement('div');
 	divPlayer1.appendChild(cardInJs);
 	cardSection[1].appendChild(divPlayer1);
 	let step = false;
 }
 //id tvox funkcia
function giveIdAndOnClick (element , id) {
	element.setAttribute('onclick', 'cardClick(event)');
	element.setAttribute('id', id);
}
function paintCard(card) {
	const cardDiv = document.createElement('div');
	cardDiv.setAttribute('class', 'card shadow  bg-white m-3 myCards'); 
	giveIdAndOnClick (cardDiv, card.id);
	const h3 = document.createElement('h3');
	const hText = document.createTextNode(card.value);
	h3.appendChild(hText);
	h3.setAttribute('class', 'text-left'); 
	giveIdAndOnClick (h3, card.id);//qani vor iran click aneluc cher ashxatum clicki funkcian
	const img = document.createElement('img');
	img.setAttribute('class', 'card-img-center img-fluid'); //qani vor iran click aneluc cher ashxatum clicki funkcian
	giveIdAndOnClick (img, card.id);
	//stex uzeci `${}-` -ov grem chstavec----------------------------------?????????????????
	switch(card.holder) {
	  case 'cross':
	    img.setAttribute('src', './Resurses/cross.png'); 
	    break;
	  case 'heart':
	    img.setAttribute('src', './Resurses/hearts.png'); 
	    break;
	  case 'diamond':
	    img.setAttribute('src', './Resurses/diamond.png'); 
	    break;
	  case 'spades':
	    img.setAttribute('src', './Resurses/spades.png'); 
	    break;
	  default:
        break;
	} 
	cardDiv.appendChild(h3);
	cardDiv.appendChild(img);
	return cardDiv;
}





//starti meja gnalu

const player1 = new Player('player1', 1);//xaxi skzbum gnacoxna
	const player2 = new Player('player2', 0);//xaxi skzbum cackoxna
	const game = new Game(player1, player2);
	game.initializationCalod();
	for(let i = 0; i < CardStandartSize; ++i) {
		game.giveCard(player1);
		game.giveCard(player2);
	}
	player1.paintPlayerCards();
	player2.paintPlayerCards();

function calodClick() {
	if(step ) {
		//while(player1.playerCards.length !== 5)
		game.giveCard(player1);
		const cardItem = paintCard(player1.playerCards[player1.playerCards.length - 1]);
		cardSection[0].appendChild(cardItem);
	} else {
		//while(player2.playerCards.length !== 5)
		game.giveCard(player2);
		const cardItem = paintCard(player2.playerCards[player2.playerCards.length - 1]);
		cardSection[2].appendChild(cardItem);
	}

}

function collect () {

}
function bita () {
	while (cardSection[1].firstChild) {
    	cardSection[1].removeChild(cardSection[1].firstChild);
    	
	}
}



function start () {
	
}

