'use strict'

let cardId = 0;
let step = true;//um hertna
const CardStandartSize = 6;
const cardSection = document.getElementsByClassName('cardSection');
const cardPlayer = document.getElementsByClassName('cardPlayer');
const game = new Game();
game.initializationCalod();
function valueGenerator() { 
	let cardValue = [6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14]; 
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

function Player (playerName) {
	const name = playerName;
	this.playerCards = [];
	this.paintPlayerCards = function () {
		for(let i = 0; i < CardStandartSize; ++i) {
			const cardItem = paintCard(this.playerCards[i]);
			name === 'player1' ? cardSection[0].appendChild(cardItem) : cardSection[2].appendChild(cardItem);
		}
	}
	this.checkGo = function(card) {
            if(game.cardsTable.length === 0) {
    	       return true;
            } else {
            	const result = game.cardsTable.filter(function(item){
            		return item.value == card.value;
            	});        
                if (result.length > 0) {
            		return true;
                }
            } 	
		return false;
	}
	this.checkCover = function(card) {
        const result = (card.value > game.cardsTable[game.cardsTable.length - 1].value && card.holder === game.cardsTable[game.cardsTable.length - 1].holder) ||
        				(card.holder === game.cozyr.holder  && card.holder !== game.cardsTable[game.cardsTable.length - 1].holder);
        console.log('result='+  result)
        return result;
           
	}
}
console.log(game.returnCalod());
console.log(game.cozyr);
function Game () {
	const cardsSize = 36;
	const cardsCalod = [];
	this.player1 = new Player('player1');//skzbum gnacoxna
	this.player2 = new Player('player2');//skzbum cackoxna
	this.cardsTable = [];
	this.cozyr;
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
		this.cozyr = cardsCalod.pop(); console.log(this.cozyr)
		cardsCalod.unshift(this.cozyr);
	}
	this.giveCard = function (player) {
		player.playerCards.push(cardsCalod.pop());
	}
	this.returnCalod = function(){
		return cardsCalod;
	}
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
	let hText;
	switch(card.value){
	  case '11':
	    hText = document.createTextNode('V');
	    break;
	  case '12':
	    hText = document.createTextNode('D');
	    break;
	  case '12':
	   hText = document.createTextNode('K');
	    break;
	  case '14':
	   hText = document.createTextNode('T');
	    break;
	  default:
	    hText = document.createTextNode(card.value);
        break;
	} 
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

//......start..........................................................................................


	for(let i = 0; i < CardStandartSize; ++i) {
		game.giveCard(game.player1);
		game.giveCard(game.player2);
	}
	game.player1.paintPlayerCards();
	game.player2.paintPlayerCards();

	const cardCozyr = paintCard(game.cozyr);
	const divCozyr = document.getElementsByClassName('calod')[0];
	divCozyr.appendChild(cardCozyr);

//.......................................................................................................
console.log(game.player1.playerCards)
console.log(step)
function cardClick (e) {
	const cardInHtml = e.target; 
 	const id = cardInHtml.id;
 	const cardInJs = document.getElementById(id);
	let carentCard;
	let carentIndex;


 	if(step){console.log(1111111)
 		console.log(game.player1.playerCards)
 		carentCard = game.player1.playerCards.find(function(item, index) {
 			//carentIndex = index;

 			return item.id == id;
 		});	
 		if (!carentCard) { 
 			//alert("Hert@ myus xaxacoxinn e");
 			return;
 		}
	    if((game.cardsTable.length % 2 === 0 && game.player1.checkGo(carentCard)) ||
	    	(game.cardsTable.length % 2 != 0 && game.player1.checkCover(carentCard))
	    	){
	 	    cardPlayer[0].appendChild(cardInJs);
	 		game.cardsTable.push(carentCard);
	 		game.player1.playerCards.splice(carentIndex, 1);
	 		step = !step;	console.log(step)
	 	} 
	 	
 	} else { 
 		console.log(22222222);console.log(game.player1.playerCards)
 		carentCard = game.player2.playerCards.find(function(item, index) {
 			//carentIndex = index;
 			return item.id == id;
 		});
 		if (!carentCard) { 
 			//alert("Hert@ myus xaxacoxinn e");
 			return;
 		}
	 	if((game.cardsTable.length % 2 === 0 && game.player2.checkGo(carentCard)) ||
	    	(game.cardsTable.length % 2 != 0 && game.player2.checkCover(carentCard))
	    	){
	 	    cardPlayer[1].appendChild(cardInJs);
	 		game.cardsTable.push(carentCard);
	 		game.player2.playerCards.splice(carentIndex, 1);
	 		step = !step;	console.log(step)
	 	}	
	 	
 	} 
 	gameOver();
 	//step = !step;
 	 //console.log(step)
 }
 function gameOver(){
 	if (game.player1.playerCards.length === 0 && game.cardsCalod.length === 0) {
 		alert("Haxtec player1");
 	} else if (game.player2.playerCards.length === 0 && game.cardsCalod.length === 0) {
 		alert("Haxtec player2");
 	}
 }

function calodClick() {
	console.log('player1-i chap ' + game.player1.playerCards.length);
		console.log('player2-i chap ' + game.player2.playerCards.length);
	//if(step ) {
		if(game.cardsTable.length  === 0) {
			while(game.player1.playerCards.length < 6) {
				game.giveCard(game.player1);
				const cardItem = paintCard(game.player1.playerCards[game.player1.playerCards.length - 1]);
				cardSection[0].appendChild(cardItem);
			}
		//} else {
			while(game.player2.playerCards.length < 6) {
				game.giveCard(game.player2);
				const cardItem = paintCard(game.player2.playerCards[game.player2.playerCards.length - 1]);
				cardSection[2].appendChild(cardItem);
			}
	    }
	//}

}

function collect () {	
	if(game.cardsTable.length % 2 === 0) {
		return;
	}
	if(!step) {//aysinqn arajinn er gnacox erkrodn havaqelua
		while (cardPlayer[0].firstChild) {//cardSection[1].removeChild(cardSection[1].firstChild);
	    	cardSection[2].appendChild(cardPlayer[0].firstChild);
	    	game.player2.playerCards.concat(game.cardsTable);
		}
		while (cardPlayer[1].firstChild) {
			cardSection[0].appendChild(cardPlayer[1].firstChild);
			game.player1.playerCards.concat(game.cardsTable);
		}
		game.cardsTable.length = 0;
		step = !step;
	} else {
		while (cardPlayer[0].firstChild) {
			cardSection[0].appendChild(cardPlayer[0].firstChild);
			game.player1.playerCards.concat(game.cardsTable);
		}
		while (cardPlayer[1].firstChild) {
			cardSection[0].appendChild(cardPlayer[1].firstChild);
			game.player1.playerCards.concat(game.cardsTable);
		}
		game.cardsTable.length = 0;
		step = !step;
	}
    calodClick();
}
function bita () { 
	if(game.cardsTable.length % 2 !== 0) {
		return;
	}
	step = !step;
	console.log(step)
	while (cardPlayer[0].firstChild) {
    	cardPlayer[0].removeChild(cardPlayer[0].firstChild);
	}
	while (cardPlayer[1].firstChild) {
    	cardPlayer[1].removeChild(cardPlayer[1].firstChild);
	}
	game.cardsTable.length = 0;
	calodClick();
}

function start () {
	
	

}

