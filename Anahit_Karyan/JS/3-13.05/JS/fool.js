'use strict'

let step = true;//um hertna
let cardId = 0;
const cardStandartSize = 6;
let cardHolder = ['cross', 'heart', 'diamond', 'spades'];
let cardValue = [6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 'V', 'V', 'V', 'V', 'D', 'D', 'D', 'D', 'K', 'K', 'K', 'K', 'T', 'T', 'T', 'T']; 
const cardSection = document.getElementsByClassName('cardSection');
function valueGenerator() { 
	let result; 
	const charactersLength = cardValue.length; 
	const index = (Math.floor(Math.random() * charactersLength));
	result = cardValue[index];
	cardValue.splice(index, 1) ;
	return result ;
} 
//der petqa stugel vor ed mastov ed qaric eli exac chlini

function holderGenerator() { 
	let result = ''; 
	const charactersLength = cardHolder.length; 
	const index = (Math.floor(Math.random() * charactersLength));
	result = cardHolder[index];
	//cardHolder.splice(index, 1) ;
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


function Player () {
	const cards = [];
	let comdition ;//kargavichak (cackoxn es te gnacox@)
	this.cardInitialization = function () {
		for(let i = 0; i < cardStandartSize; ++i) {
			cards[i] = createCard();
		}	
	}
	this.paintPlayerCards = function (cardStandartSize) {
		for(let i = 0; i < cardStandartSize; ++i) {
			const cardItem = paintCard(cards[i]);
			step === true ? cardSection[0].appendChild(cardItem) : cardSection[2].appendChild(cardItem);
		}
	}
	// this.step = function() {

	// }
	// this.collect = function() {

	// }
}

function cardClick (e) {
	const cardInHtml = e.target; 
 	const id = cardInHtml.id;
 	const cardInJs = document.getElementById(e.target.id);
 	
 	//const cardItem = paintCard(cards[i]);
	cardSection[1].appendChild(cardInJs);
 	//if(id.parentElement.id === p1-section comdition ===1 ) gnacoxn es voch te cackox@
 	const divPlayer1 = document.createElement('div');
 	divPlayer1.appendChild(cardInJs);
 	cardSection[1].appendChild(divPlayer1);
 	let step = false;
 	
 	//cardInJs.parentNode.removeChild(cardInJs);
 	//else {comdition ===0}
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

	//stex uzeci `${}-` -ov grem chstavec-----------------------?????????????????
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
	//cardSection[0].appendChild(card);

}
function start () {
	const player1 = new Player();
	player1.cardInitialization();
	player1.paintPlayerCards(cardStandartSize);
	player1.comdition = 1;//gnacox@ skzbum player1-na
	step = false;
	const player2 = new Player();
	player2.cardInitialization();
	player2.paintPlayerCards(cardStandartSize);

}

