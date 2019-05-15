/*
let cards = [   '6ch', '7ch', '8ch', '9ch', '10ch', 'Jch', 'Qch', 'Kch', 'Ach',
                '6pi', '7pi', '8pi', '9pi', '10pi', 'Jpi', 'Qpi', 'Kpi', 'Api',
                '6kr', '7kr', '8kr', '9kr', '10kr', 'Jkr', 'Qkr', 'Kkr', 'Akr',
                '6bu', '7bu', '8bu', '9bu', '10bu', 'Jbu', 'Qbu', 'Kbu', 'Abu',
			];//all cards
*/
//xar,xach,qarpich,sirt
let cards = [   '1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c',
                '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', 
                '1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k',
                '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b',
			];//all cards
						
let kozrs = new Array();//kozrs
let passage = 1;//who need do passage 1 => gamer1, 2 => gamer2

let gamer1 = new Array();
let gamer1Cnt = 0; //number cards of gamer1
let gamer1Defeat = false;//gamer1 defeat gamer2

let gamer2 = new Array();
let gamer2Cnt = 0; //number cards of gamer2
let gamer2Defeat = false;//gamer2 defeat gamer1

let caloda = new Array();
let colodaCnt = 0; //number cards of caloda

let lastCard = -1; //last card
let kozr = -1; 

let tableCaloda = new Array();
let tableCnt = 0;

let cardsNumber = 36;

let indexArr = [];
console.log(cards);

let arr = [];
	let arr1 = [];
//genarate cards for  gamers (called 2* )
function generateCard(){
	let indexID=[];
	let tmpArr = [];
	let cardNumber = 0;
	while(cardNumber !== 6) {
		//alert('while');
		let index = Math.floor(Math.random()* (35) + 1);
		
		if(indexArr.indexOf(index) === -1) {
			indexArr.push(index);
			indexID.push(index);
			tmpArr.push(cards[index]);
			//console.log('index',index);
			//console.log('gg',tmpArr);
			cardNumber++;
		} else {
			//console.log('krknvuma');
		}		
	}
	let size;
	if(passage === 1) {
		size = gamer1Cnt;
	} else {
		size = gamer2Cnt;
	}
	for(let k = 0; k < size; k++) {
		let button1 = document.createElement('button');		
		let text = document.createTextNode(tmpArr[k]);
		button1.style.margin = '-10px';
		button1.style.width = '5vw';
		if(passage === 1) {
			var idd = tmpArr[k];
			button1.id = idd;
			let img = document.createElement('IMG');
			img.id=tmpArr[k];
			var s ="http://www.softholm.com/igry/durak/img/" +indexID[k]+ ".gif";
			img.src=s;
			img.addEventListener('click',xod);
    
			button1.appendChild(img);
			document.getElementById('div11').appendChild(button1);
			
		} else {
			var idd = tmpArr[k];
			button1.id = idd;
			let img = document.createElement('IMG');
			img.id=tmpArr[k];
			var s ="http://www.softholm.com/igry/durak/img/" +indexID[k]+ ".gif";
			img.src=s;
			img.addEventListener('click',xod);
			button1.appendChild(img);
			document.getElementById('div4').appendChild(button1);
		}
	}
	passage++;
	
	return tmpArr;
}

//genarate Kozer
function genarateKozr(){
	let kozrFlag = false;//Kozer undefineed
	let indexKozr;
	while(!kozrFlag) {
		indexKozr = Math.floor(Math.random()* (35) + 1);
		if(indexArr.indexOf(indexKozr) === -1){
			kozr = cards[indexKozr];
			indexArr.push(indexKozr);
			kozrFlag = true;
		}
	}
	let button1 = document.createElement('button');
	button1.id = 'k';
	let text = document.createTextNode(kozr);
	button1.style.margin = '5px 20px 5px 20px';
	button1.style.width = '5vw';
	let img = document.createElement('IMG');
	img.id = kozr;
	var s ="http://www.softholm.com/igry/durak/img/" + indexKozr + ".gif";
	img.src=s;
	button1.appendChild(img);
	document.getElementById('div2_2').appendChild(button1);
}

//genarate Calod
function generateCalod(){
	for(let i = 0; i < cardsNumber; ++i) {
		if(indexArr.indexOf(i) === -1){
			caloda.push(cards[i]);
		}
	}	
	calodaCnt = caloda.length;
	//for(let k = 0; k < 6; k++) {
		let button1 = document.createElement('button');
		let text = document.createTextNode(caloda[k]);
		button1.style.margin = '-45px';
		button1.style.width = '5vw';
		button1.id = 'c'+ k;
		document.getElementById('div2_2').appendChild(button1);
		var idd = '1'+ k;
		button1.id = idd;
		let img = document.createElement('IMG');
		img.id="im1";
		img.src="http://www.softholm.com/igry/durak/img/back.gif";
		button1.appendChild(img);
		document.getElementById('div2_2').appendChild(button1);
	//}
}

function isKozer(card) {
	if(card[1] === kozr[1]) {
		return true;
	} else {
		return false;
	}
	console.log('card is koser',card[1]);
}

function mast(card1,card2) {
	
	//card is koser ?
	//if(passage === 1) {
		if(isKozer(card1)){
			if(isKozer(card2)) {
				if(card2[0] > card1[0]) {
					console.log('2 ne kozr u cackecin irar');
					return true;

				} else {
					console.log('2rdi kozr@ cacra chi kara cacki');
					return false;
					
				}
			} else {
				console.log('2rd@ kozr chi chi kara cacki');
				return false;
			}
		} else {
			if(isKozer(card2)) {
				console.log('2rd@ kozra kccacki');
				return true;				
			} else if (card2[0] > card1[0] && card2[1] === card1[1]) {
				console.log('voch mek kozr chi 2rd@ kcacki arajinin');
				return true;
			} else {
				console.log('voch mek kozr chi  2rd@ cacra chi kara cacki');
				return false;
			}
		}
//	} 
	/*else {
		if(isKozer(card2)){
			if(isKozer(card1)) {
				if(card2[0] > card1[0]) {
					console.log('2 ne kozr u cackecin irar');
				} else {
					console.log('1rdi kozr@ cacra chi kara cacki');
				}
			} else {
				console.log('1rd@ kozr chi chi kara cacki');
			}
		} else {
			if(isKozer(card1)) {
				console.log('1rd@ kozra kccacki');
			} else if (card1[0] > card2[0]) {
				console.log('voch mek kozr chi 1rd@ kcacki arajinin');
			} else {
				console.log('voch mek kozr chi  1rd@ cacra chi kara cacki');
			}
		}
	}*/
}

function newCardForGamer(){
	let flag = false;
	let newCard;
	while(!flag) {
		let indexNewCard = Math.floor(Math.random()* (calodaCnt) + 1);
		if(indexArr.indexOf(indexNewCard) === -1) {
			indexArr.push(indexNewCard);
			calodaCnt--;
			flag = true;
			newCard = caloda[indexNewCard];
			//caloda.splice(indexNewCard, 1);//delete card in caloda
		} else {
			//console.log('krknvuma');
		}		
	}
	return newCard;
}

/*
function newCardInTable (passage) {
	/*let flag = false;
	if(passage === 1) {
		//card gamer1
		while(!flag) {
			let indexCardInTable = Math.floor(Math.random()* (gamer1Cnt) + 1);
			gamer1Cnt--;
			flag = true;
			newCardForTable = gamer1[indexCardInTable];
			//gamer1.splice(indexCardInTable, 1);//delete card in gamer1
			}
	} else if(passage === 2){
		//card gamer2
		while(!flag) {
			let indexNewCard = Math.floor(Math.random()* (calodaCnt) + 1);
			if(indexArr.indexOf(indexNewCard) === -1) {
				indexArr.push(indexNewCard);
				calodaCnt--;
				flag = true;
				newCard = caloda[indexNewCard];
				//caloda.splice(indexNewCard, 1);//delete card in caloda
			} else {
				//console.log('krknvuma');
			}		
		}
	}//stex petqa pakox astxanishov com lini
	
	if(passage === 1) {
		//card gamer1
		
	} else if(passage === 2){
		//card gamer2
		
	}
	
}

function getID() {
	let indexId;
	return indexID;
}

//gamer1 qayl@
function gamer1progress() {
	//get clicked button's id
	let indexG1 = getID();
	return gamer1[indexG1];
}

function gamer2progress() {
	let indexG2 = getID();
	return gamer2[indexG1];
}

function progress( passage) {
	if(passage === 1) {
		gamer1progress();
	} else {
		gamer2progress();
	}
	mast(gamer1[gamer1index], gamer2[gamer2Index], passage);
	
}

//gamer pick cards //havaqel
function pick () {
	game(passage);
}
*/
function bita() {
	tableCaloda = [];
	tableCnt = 0;
	var element = document.getElementById("div2_1");
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}

}



/*
function game(passage) {
	if(passage === 1) {
		//game start first gamer
		startGame();
	} else {
		//game start second gamer
		startGame();
	}
	
}

function startGame() {
	if(passage === 1) {
		//game start first gamer
		gamer1progress();
	} else {
		//game start second gamer
		gamer2progress();
	}
}

*/
	
function startGame(){

}
function xod() {
	
	const eventId = event.target.id ;
		let index ;
		let indexG;
		if(tableCnt === 0) {
			for (let i = 0; i < 2; i++){
			let text1;
			let button2 = document.createElement('button');
			if(i === 0) {
				text1 = document.createTextNode('bita');
				button2.style.margin = '100px';
			} else {
				text1 = document.createTextNode('get');
				//button2.style.margin = '50px';
			}
			button2.style.background = 'lightblue';			
			button2.style.width = '5vw';
			button2.id = 'c'+ k;
			var idd = '1'+ k;
			button2.id = idd;
			button2.appendChild(text1);
			button2.addEventListener('click',bita);
			document.getElementById('div2_2').appendChild(button2);
			}/*
			let button3 = document.createElement('button');
			let text2 = document.createTextNode('get');
			button3.style.background = 'lightgreen';
			button3.style.margin = '100px';
			button3.style.width = '5vw';
			button3.id = 'c'+ k;
			var idd = '1'+ k;
			button3.id = idd;
			button3.appendChild(text1);
			button3.addEventListener('click',getCards);
			document.getElementById('div2_2').appendChild(button3);*/
			tableCaloda.push(eventId);
			index = cards.indexOf(eventId);//number card for gamer1
			if(gamer1.indexOf(eventId)) {
				indexG = gamer1.indexOf(eventId);
			} else {
				indexG = gamer2.indexOf(eventId);
			}
			let button1 = document.createElement('button');	
			button1.style.margin = '-10px';
			button1.style.width = '5vw';
			let img = document.createElement('IMG');
			img.id = eventId;
			var s ="http://www.softholm.com/igry/durak/img/" + index + ".gif";
			img.src=s;
			if(gamer1.indexOf(eventId)) {
				gamer1.splice(indexG, 1);//delete card
			} else {
				gamer2.splice(indexG, 1);//delete card
			}
			button1.appendChild(img);
			document.getElementById('div2_1').appendChild(button1);
			tableCnt++;
			passage++;
			console.log(gamer1);
		}else if(tableCnt < 12){
			let masts;
			tableCaloda.push(eventId);
		//	alert(tableCnt);
			if(tableCnt %2 === 0){
				function addCardTable() {
					let count = tableCnt;
					while(count > 0){
						if(tableCaloda[tableCnt][0] == tableCaloda[count - 1][0]) {
							if(tableCaloda[tableCnt][1] == tableCaloda[count - 1][1]){
								masts = false;
							} else {
								masts = true;
							}
						} 
						count--;
					}
				}
				addCardTable();
					
			} else {
				let count = tableCnt;
				masts = true;
				while(count > 0){
					if((tableCaloda[tableCnt][0] == tableCaloda[count - 1][0]) && (tableCaloda[tableCnt][1] == tableCaloda[count - 1][1])){
						masts = false;
					} 
					count--;
				}
				if(masts) {
					masts = mast(tableCaloda[tableCnt-1],tableCaloda[tableCnt]);				}
				}
			
			//	alert(masts);
				if(masts) {
					//(gamer1.indexOf(eventId)   orr passage === 1                ///////////////////////////////////
					if(gamer1.indexOf(eventId) !== -1) {
						indexG = gamer1.indexOf(eventId);
						passage++;
					} else {
						indexG = gamer2.indexOf(eventId);
						passage--;
					}
					index = cards.indexOf(eventId);
					let button1 = document.createElement('button');	
					button1.style.margin = '-10px';
					button1.style.width = '5vw';
					let img = document.createElement('IMG');
					img.id = eventId;
					var s ="http://www.softholm.com/igry/durak/img/" + index + ".gif";
					img.src=s;
					arr.splice(indexG, 1);
					button1.appendChild(img);
					document.getElementById('div2_1').appendChild(button1);
					tableCnt++;
					//passage++;
					console.log(gamer1);
					
					if(gamer1.indexOf(eventId) !== -1) {
						gamer1.splice(indexG, 1);//delete card
					} else {
						gamer2.splice(indexG, 1);//delete card
					}
				
				}//else if(){
				//stugum
			//}
			else {
				tableCaloda.pop();
				alert('urish qar ');
			}
			if(tableCnt === 12){
				alert("bitaaa");
				bita();
				
			}
		} else {
			alert("bita");
		}
		alert('index');
		alert(indexG);
		console.log('gaaaaaaaam',gamer1);
		console.log('gaaaaaaaam222',gamer2);
}

function getCards() {
	for(let j = 0; j < tableCnt; ++j) {
		if(passage === 1) {
			gamer1.push(tableCaloda[j]);
			size1 = gamer1.length;
		} else {
			gamer2.push(tableCaloda[j]);
			size1 = gamer2.length;
		}
	}
	var element1 = document.getElementById("div4");
		while (element1.firstChild) {
			element1.removeChild(element.firstChild);
		}
	for(let k = 0; k < size1; k++) {
		let button1 = document.createElement('button');		
		let text = document.createTextNode(gamer1[k]);
		indeid = caloda.indexOf(gamer1[k]);
		button1.style.margin = '-10px';
		button1.style.width = '5vw';
		if(passage === 1) {
			var idd = gamer1[k];
			button1.id = idd;
			let img = document.createElement('IMG');
			img.id = gamer1[k];
			var s ="http://www.softholm.com/igry/durak/img/" + indexid + ".gif";
			img.src = s;
			img.addEventListener('click',xod);
    
			button1.appendChild(img);
			document.getElementById('div11').appendChild(button1);
			
		} else {
			var idd = gamer2[k];
			button1.id = idd;
			let img = document.createElement('IMG');
			img.id =  gamer2[k];
			var s ="http://www.softholm.com/igry/durak/img/" + indexid + ".gif";
			img.src = s;
			img.addEventListener('click',xod);
			button1.appendChild(img);
			document.getElementById('div4').appendChild(button1);
		}
	}
}

function start() {
	gamer1Cnt = 6;
	gamer2Cnt = 6;
	
	//genarate cards for first gamer
	gamer1 = generateCard();
	console.log('gamer1',gamer1);
	
	//genarate cards for second gamer
	gamer2 = generateCard();
	console.log('gamer2',gamer2);
	
	passage = 1;
	
	//genarate korz
	genarateKozr();
	console.log('kozr', kozr);
	
	//genarate Calods
	generateCalod();
	console.log('caloda',caloda);
	
	//startGame();
}



isKozer('6c');




start();

