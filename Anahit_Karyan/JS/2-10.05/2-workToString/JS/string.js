const string = 'assllip%gp;gmn]GabGwe';
console.log(string);
function isNumber(num) {
     return num === +num;
}
function changeString(str) {
	const array = str.split('');
	let firstIndex;
	for(let i = 0; i < array.length; ++i) {
		if(isNumber(Number(array[i]))) {
			console.log('There should be no numbers on the string');
			return;
		}else if(array[i] === 'g') {
			firstIndex = i;
		} else if(array[i] === 'G') {
			const count = i - firstIndex + 1;
			let reversPart = array.slice(firstIndex + 1, i);
			array.splice(firstIndex , count, reversPart.reverse().join(''));
			str = array.join('');
			console.log(str);
			return changeString(str);
		}
	} 
	return str;
}
console.log(changeString(string));

//...........................
function start() {
	const string = prompt('Enter your string');
	const string2 = changeString(string);

	const divs = document.getElementsByTagName('div');

	const firstH4 = document.createElement('h4');
	const hText1 = document.createTextNode(string);
	firstH4.appendChild(hText1);
	divs[0].appendChild(firstH4);

	const secondH4 = document.createElement('h4');
	const hText2 = document.createTextNode(string2);
	secondH4.appendChild(hText2);
	divs[1].appendChild(secondH4);
}
