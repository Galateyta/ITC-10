const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const masts = ['qyap', 'sirt', 'ghar', 'xach'];

function getImg(mastImg) {
	
	if (mastImg === 'sirt') {
		
	
		return '&hearts;';
	
	} else if( mastImg === 'qyap') {
	
		return '&diams;';
	
	} else 
		if(mastImg === 'ghar') {
	
		return '&spades;';
	
	} else if(mastImg === 'xach'){
	
		return '&clubs;';
	
	}

}

const initCards = function () {

    const cards = [];

    values.forEach((value) => {

		masts.forEach((mast) => {
			cards.push(new Card(mast, value));
	
		})

	});
	
	
	
    return cards;

}



//Anna and Garik

const shuffle = function (cards) {
	
    const length = cards.length - 1;

    for (let i = 0; i < length; i++) {

		i = Math.floor(Math.random() * length);

		[cards[length], cards[i]] = [cards[i], cards[length]];

	}
	
	let coserButton = document.createElement('button');
	
	coserButton.id = 'calods';
	
	coserButton.style.width = '100px';
	
	coserButton.style.height = '135px';
	
	coserButton.style.background = 'white';
	
	coserButton.style.margin = '0 0 0 -25px';
		
	coserButton.style.borderColor = 'white';
//	<img style="-webkit-user-select: none;" src="http://www.softholm.com/igry/durak/img/18.gif">
	
	coserButton.innerHTML = '<img style="-webkit-user-select: bloke;width:100px;height:135px" src="http://www.softholm.com/igry/durak/img/back.gif">';
	
	document.getElementById('div2_3').appendChild(coserButton);

	return cards;

}

function getValue(value) {
	
	let currentValue;
	
	switch (value) {
    
		case 0:
			
			currentValue = '6';
            break;

        case 1:
       
			currentValue = '7';
            break;
            
		case 2:
        
			currentValue = '8';
            break;
			
        case 3:
        
			currentValue = '9';
            break;
			
		case 4:
               
			currentValue = '10';   
			break;
			
        case 5:
                
			currentValue = 'J';
            break;
            
		case 6:
                
			currentValue = 'Q';
            break;
            
		case 7:
                
			currentValue = 'K';
            break;
		
		case 8:
                
			currentValue = 'T';
            break;
			
        default:
            
			currentValue = value;
    }
	
	return currentValue;
}

const getPlayerCards = function (cards, count, name,a) {
	
	const kalod = cards.slice(0, count);
	
	cards.splice(0, count);
	
	for(let i = 0; i < count; ++i) {
		let cardButton = document.createElement('button');
	
		cardButton.id = kalod[i].value +  getImg(kalod[i].mast);
		
		cardButton.style.width = '100px';
		
		cardButton.style.height = '135px';
		
		cardButton.style.background = 'lightyellow';
		
		cardButton.style.margin = '-13px';
		
		cardButton.style.borderColor = 'black';
		//cardButton.style.color = 'white';
		alert(a);
		cardButton.innerHTML = getValue((kalod[i].value)) + getImg(kalod[i].mast);
		
		cardButton.addEventListener('click',a.goCard(kalod[i]));
		
		if(name === 'player1') {
		
			document.getElementById('div11').appendChild(cardButton);
			
		} else {
			
			document.getElementById('div4').appendChild(cardButton);
			
		}
	}
	
	return kalod;
}

function foo(){alert('foooo');}


//Armine

const getCoser = function (cards) {
	
	const length = cards.length;
	
	const indexCoser = Math.floor(Math.random() * length);
//	alert(indexCoser);
	
	[cards[length - 1], cards[indexCoser]] = [cards[indexCoser], cards[length - 1]];
	
	let coserButton = document.createElement('button');
	
	coserButton.id = 'kozer';
	
	coserButton.style.width = '100px';
	
	coserButton.style.height = '135px';
	
	coserButton.style.background = 'lightyellow';
	
	coserButton.style.margin = '-13px';
		
	coserButton.style.borderColor = 'black';
	
	coserButton.innerHTML = getValue(cards[0].value) + getImg(cards[0].mast);
	
	document.getElementById('div2_3').appendChild(coserButton);
	
	return cards[length - 1];
}

//Hunan, Mane

const getFirstPlayer = function (player1, player2, coser) {
	    
	const coser1 = [];
    
	const coser2 = [];
    
	const count = 6;
	
    for (let i = 0; i < count; ++i) {
    
		if (player1.cards.mast === coser.mast) {

			coser1.push(player1.cards.value_);

		}
		
		if (player1.cards.mast === coser.mast) {
		
			coser1.push(player1.cards.value);
		
		}
    
	}

    const count1 = coser1.length;
    
	const count2 = coser2.length;
	
	if (count1 == 0 && count2 > 0) {
	
		return player2;
	
	} else if (count2 == 0 && count1 > 0) {
	
		return player1;
	
	} else if (count1 == 0 && count2 == 0) {
	
		return player1;
	
	} else {
	
		let minPlayer1 = coser1[0];
		
		let minPlayer2 = coser2[0];
		
		for (let i = 1; i < count1; ++i) {
		
			if (coser1[i] < minPlayer1) {
			
				minPlayer1 = coser1[i];
			
			}
		}
		
		for (i = 1; i < count2; ++i) {
			
			if (coser2[i] < minPlayer2) {
			
			minPlayer2 = coser2[i];
			
			}
		}
		
		if(minPlayer1 < minPlayer2) {
			
			return player1;
		
		} else {
			
			return player2;
		
		}
		
	}
	
}



const Game = function () {

	const count = 6;

	this.cards = [];

	this.state = {

		currentPlayer: {},

		cards: []

	};

	this.player1 = new Player('Player1');

	this.player2 = new Player('Player2');

	this.cards = initCards();
	//console.log(this.cards[0].mast);

	this.cards = shuffle(this.cards);

	this.player1.cards = getPlayerCards(this.cards, count, 'player1',this);

	this.player2.cards = getPlayerCards(this.cards, count, 'player2',this);

	this.coser = getCoser(this.cards);

	this.state.currentPlayer = getFirstPlayer(this.player1, this.player2, this.coser);

  //Tigran, Artur

	this.goNextStep = function (card) {
	const eventId = event.target.id ;
	alert(eventId);
    //bita anel kam havaqel, poxel state,
		const maxCount = 12;
		
		if (this.state.cards.length < maxCount) {
		
			if (player1.name !== this.state.currentPlayer.name) {
				
				player1.cards = player1.cards.concat(this.state.cards);
				
				this.state.cards = [];
			
			} else {
				
				player2.cards = player2.cards.concat(this.state.cards);
				
				this.state.cards = [];
			
			}
		
		} else {		
			
			this.state.cards = [];
			
			if (player1 != this.state.currentPlayer) {
				
				this.state.currentPlayer = player1;
			
			} else {
				
				this.state.currentPlayer = player2;
			
			}
		
		}
		//STugel xax@ verjacel a te che 
    
		return this.cards === [] && (player1.cards === [] || player2.cards === []);

	}

}



const Player = function (name) {

	this.cards = [];
	
	this.name = name;
	
	this.state = true;

let aa =document.getElementById('div4');
	let bb =document.getElementById('div11');
	aa.addEventListener('click',this.goCard);
	bb.addEventListener('click',this.goCard);
	
  //ANahit, Narek
    this.goCard = function (card) {
	  alert('goooo');
		if(this.name !== game.state.currentPlayer.name) {
	
			return false;
		
		} else {
		
			if(tableCards.length === 0) {
				
				goNextStep(card);
			
			} else {
				
				function checkValue(player) {
					
					return (player.card.value === card.value);
				
				}
				
				if(player1.filter(checkValue).length > 0) {
					
					goNextStep(card);
				
				}
			
			}
			
			return false;
		
		}  
    //ete arajin qayln che katarael hamapatasxan stugum@
    
	}

    this.coverCard = function (card) {
		
		if(this.name !== game.state.currentPlayer.name) {
			
			return false;
		
		} else {
			
			const tableCards = game.state.card;  
			
			if (card.value > tableCards[tableCards.length - 1].value && card.mast === tableCards[tableCards.length - 1].mast) {
				
				goNextStep(card);
			
			}		
			
			return false;
		
		}
	
	}
	
	
	
		
			
//verj
}

const Card = function (mast, value) {
	
	this.mast = mast;
	
	this.value = value;

}
const game = new Game();
