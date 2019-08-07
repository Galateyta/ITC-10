
//xar,xach,qarpich,sirt
let cards = [   '1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c',
                '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', 
                '1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k',
                '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b',
			];//all cards

	
let gamer1Cards = [];
let gamer1CardsCount = gamer1Cards.length; // cards number of gamer1

let gamer2Cards = new Array();
let gamer2CardsCount= gamer2Cards.length; // cards number of 

let tableCards = new Array();
let tableCardsCount = 0;

let clonCards = new Array();

let kozr = -1;
const kozerCards = new Array();
let cardsNumber = cards.length;

let state = 0;//who is attake
let currentState = 0; //who is current step
const maxCardsCount = 6;

//clone origin cards (for easy searching)
const arrayId = function () {
	
	for(let i = 0; i < cardsNumber; ++i) {
		clonCards.push(cards[i]);
	}
	
}


//shuffle cards 
const shuffle = function () {
    arrayId();
    for (let i = 0; i < cardsNumber; i++) {
		i = Math.floor(Math.random() * cardsNumber);
		[cards[cardsNumber - 1], cards[i]] = [cards[i], cards[cardsNumber - 1]];
    }
	
}


//geting cards players	
const getPlayerCards = function () {
	let count;
	
	if(tableCardsCount === 0){
		let length1 = gamer1Cards.length;
		let length2 = gamer2Cards.length;
		if(length1 < maxCardsCount ) {
			count = maxCardsCount - length1;
			for(let i = 0; i < count; ++i){
				let length = cards.length - 1;
				gamer1Cards.push(cards[length]);
				cards.splice(length, 1);
			}			
			drowCard(count,'gamer1');

		} else if(length2 < maxCardsCount){
			count = maxCardsCount - length2;
			for(let i = 0; i < count; ++i) {
				let length = cards.length - 1;
				gamer2Cards.push(cards[length]);
				cards.splice(length, 1);
			}			
			
            drowCard(count,'gamer2');
		}
		
	}
}


//generate kozr and arrey of kozers
const getKoser = function () {

	let length = cards.length - 1;
	let cardCount = 9;
	const indexCoser = Math.floor(Math.random() * length/2 + Math.random() * length/2 );
	kozr = cards[indexCoser];	
	[cards[length], cards[indexCoser]] = [cards[indexCoser], cards[length]];
	if(indexCoser < 9) {
		let i = 0;
		while(cardCount > 0) {
			kozerCards.push(clonCards[i++]);
			cardCount--;
		}
	} else if(indexCoser > 8 && indexCoser < 18) {
		let i = 0;
		while(cardCount > 0) {
			kozerCards.push(clonCards[i++]);
			cardCount--;
		}
	} else if(indexCoser > 17 && indexCoser < 27) {
		let i = 0;
		while(cardCount > 0) {
			kozerCards.push(clonCards[i++]);
			cardCount--;
		}
	} else {
		let i = 0;
		while(cardCount > 0) {
			kozerCards.push(clonCards[i++]);
			cardCount--;
		}
	}
}


//check cards is kozer ?
function isKozer(card) {
	if(kozerCards.indexOf(card) !== -1) {
		return true ;
	} 
	return false;
}


//check can add card table or get all cards in table
function mast(card1,card2) {
	if(isKozer(card1)){
		if(isKozer(card2)) {
			if(card2[0] > card1[0]) {
				return true;
			} else {
			    return false;
					
		    }
		} else {
			return false;
		}
	} else {
		if(isKozer(card2)) {
			return true;				
		} else if (card2[0] > card1[0] && card2[1] === card1[1]) {
			return true;
		} else {
			return false;
		}
	}

}


//bita all cards in table
function bita() {
	currentState = 0;
	let number = 0;
	gamer1CardsCount = gamer1Cards.length;
	gamer2CardsCount = gamer2Cards.length;
	tableCardsCount = tableCards.length;;
	if(tableCardsCount%2 === 0 && state === 0) {
		number = maxCardsCount - gamer1CardsCount;
		getPlayerCards(number,gamer1);
		state=!state;
		const element = document.getElementById('table');

		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}else if(tableCardsCount%2 === 0 && state === 1) {
		number = maxCardsCount - gamer2CardsCount;
		getPlayerCards(number,gamer2);
		state=!state;
		const element = document.getElementById('table');

		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

}


//geting card in table 
function getCards() {
	let size1;
	gamer1CardsCount = gamer1Cards.length;
	gamer2CardsCount = gamer2Cards.length;
	var element = document.getElementById('table');
	
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	
	if(state === 0) {
		
		gamer2Cards.concat(tableCards);		
		var element = document.getElementById('gamer2');
		
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
		
		drowGetGard(gamer2);
		size1 = gamer2CardsCount;
	}else {
		
		gamer1Cards.concat(tableCards);		
		var element = document.getElementById('div11');
		
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
		
		drowGetGard(gamer1);
		size1 = gamer1CardsCount;
	}

}

//drow new array of cards
function drowGetGard (divId) {
	gamer1CardsCount = gamer1Cards.length;
	gamer2CardsCount = gamer2Cards.length;
	let drowCard;
	for(let i = 0; i < gamer1CardsCount; ++i) {;
		let button1 = document.createElement('button');
		let index;
		let img = document.createElement('IMG');
		button1.style.margin = '-45px';
		buton1.style.width = '5vw';
		if(divId === 'gamer1') {
			drowCard = gamer1Cards[i];	
			img.src = 'http://www.softholm.com/igry/durak/img/' + indexId + '.gif';
		}else {
			drowCard = gamer2Cards[i];
			img.src = 'http://www.softholm.com/igry/durak/img/' + indexId + '.gif';
		}
		indexId = clonCards.indexOf(drowCard);
		buton.id = indexId;
		img.id = indexId;
		button1.appendChild(img);	
		document.getElementById('gamer1').appendChild(button);
	}

}


//drow card for players
const drowCard = function (count, divIdi) {
	console.log('drow func',divIdi);
	let indexId;
		
	if(divIdi === 'gamer1') {console.log('arji for');
		for(let i = count; i > 0; --i) {
			let button1 = document.createElement('button');
			let img = document.createElement('IMG');
			let drowCard1 = gamer1Cards[maxCardsCount - i ];
			button1.style.width = '5vw';
			button1.style.margin = '-50px';
			indexId = clonCards.indexOf(drowCard1);		
			img.src = 'http://www.softholm.com/igry/durak/img/' + indexId + '.gif';
			img.addEventListener('click',goNextStep);
			button1.id = indexId;
			img.id = indexId;
			button1.appendChild(img);	
			document.getElementById('gamer1').appendChild(button1);
		}
	} else if(divIdi === 'gamer2') {
		for(let i = count; i > 0; --i) {
			let button1 = document.createElement('button');
			let img = document.createElement('IMG');
			let drowCard2 = gamer2Cards[maxCardsCount - i];
			button1.id=indexId;
			button1.style.width = '5vw';
			button1.style.margin = '-50px';
			indexId = clonCards.indexOf(drowCard2);			
			img.src = 'http://www.softholm.com/igry/durak/img/' + indexId + '.gif';
			img.addEventListener('click',goNextStep);
			img.id = indexId;
			button1.appendChild(img);		
			document.getElementById('gamer2').appendChild(button1);
		}
	}
	
}

//droe kozr
function drowKozr() {
	const drowCount = 2;
	let cardId = clonCards.indexOf(kozr);
	for(let i = 0; i < drowCount; ++i) {
		let button1 = document.createElement('button');		
		button1.style.width = '5vw';
		
		if(i === 0) {
			let img1 = document.createElement('IMG');
			img1.id = 'kozr';
			img1.src = 'http://www.softholm.com/igry/durak/img/' + cardId + '.gif';
			img1.addEventListener('click',getCards);
			button1.appendChild(img1);
		}else {	button1.style.margin = '-15px';
			let img = document.createElement('IMG');
			img.id = 'back';
			img.src = 'http://www.softholm.com/igry/durak/img/back.gif';
			img.addEventListener('click',getCards);
			button1.appendChild(img);
		}
				
		document.getElementById('kozr').appendChild(button1);
	}
}

//drow table
function drowTable(cardId) {
	let button1 = document.createElement('button');		
	button1.style.width = '5vw';
	let img = document.createElement('IMG');
	img.src = 'http://www.softholm.com/igry/durak/img/' + cardId + '.gif';
	img.id = cardId;
	button1.id = cardId;
	button1.appendChild(img);
	document.getElementById('table').appendChild(img);
}

//droe butt Bita and Get
function drowButton () {
	let buttonCount = 2;
	for (let i = 0; i < buttonCount; i++){
		let text1;
		let button2 = document.createElement('button');
		if(i === 0) {
			text1 = document.createTextNode('bita');
			button2.style.margin = '100px';
			button2.addEventListener('click',bita);
		} else {
			text1 = document.createTextNode('get');
			button2.addEventListener('click',getCards);
		}
		button2.style.background = 'lightblue';			
		button2.style.width = '5vw';
		button2.appendChild(text1);
		document.getElementById('kozr').appendChild(button2);
	}
}

//delete that cards witch in the table
function deleteCard (cardId) {
		var item = document.getElementById(cardId);
		item.parentNode.removeChild(item);
}

//chachk who did step
function goNextStep() {
	const eventId = event.target.id ;
	let index ;
	tableCardsCount = tableCards.length;
	if(tableCardsCount === 0) {;
		currentState = !currentState;
		tableCards.push(clonCards[eventId]);
		if(state === 0) {
			index = gamer1Cards.indexOf(eventId);
			gamer1Cards.splice(index, 1);
			deleteCard(eventId);
			drowTable(eventId);
		} else {
			index = gamer2Cards.indexOf(eventId);
			gamer2Cards.splice(index, 1);
			deleteCard(eventId);
			drowTable(eventId);
		}
i		
	} else if(tableCardsCount < 12){
		let masts = true;
		let count = tableCards.lengt;
		tableCards.push(eventId);
		if(tableCardsCount %2 === 0){
			function addCardTable() {
				while(count > 0){
					if(tableCards[tableCardsCount][0] === tableCards[count - 1][0]) {
						if(tableCards[tableCardsCount][1] === tableCards[count - 1][1]){
							masts = false;
						} 
					} 
					count--;
				}
			}
			addCardTable();
		} else {
			while(count > 0){
				if((tableCards[tableCardsCount][0] === tableCards[count - 1][0]) && (tableCards[tableCardsCount][1] === tableCards[count - 1][1])) {
					masts = false;
				} 
				count--;
			}
			if(masts) {
				
				masts = mast(tableCards[tableCardsCount-1],tableCards[tableCardsCount]);	
				
			}
			if(masts) {
				if(state === 0) {
					
					index = gamer1Cards.indexOf(clonCards[eventId]);
					gamer1Cards.splice(index, 1);
					deleteCard(eventId);
					drowTable(eventId);
					currentState = !currentState;
					
				} else {
					
					index = gamer2Cards.indexOf(clonCards[eventId]);//vor elementna click exel,
					gamer2.splice(index, 1);//click exac card@ jnjum enq
					deleteCard(eventId);
					drowTable(eventId);
					currentState = !currentState;
					
				}
				
			} else {
				
				tableCards.pop();
				
			}
		}
	} else {
		bita();				
	}
	
}

//start
function start() {
	shuffle();
	getPlayerCards();
	getPlayerCards();
	getKoser();
	drowKozr();
	drowButton();	
	state = 0;
	currentState = 0;	
}

start();






