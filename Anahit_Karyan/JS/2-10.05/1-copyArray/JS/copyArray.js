//const array = [2,6,[3,5],8,[3],[1,8,[0,6],14],20];

//function copy an array---------------------------

function copyArray(array) {
    const resultArray = [];
    for(let i = 0; i < array.length; ++i) {
        if(!Array.isArray(array[i])) {
            resultArray.push(array[i]);
        } else {
            resultArray.push(copyArray(array[i]));
        }
    }
    return resultArray;
}
//--------------------------------------------------
function start() {
	const array = prompt("Enter your array separating elements by ','").split(",");
	const array2 = copyArray(array);

	const divs = document.getElementsByTagName("div");
	const firstH4 = document.createElement("h4");
	const hText1 = document.createTextNode(array);
	firstH4.appendChild(hText1);
	divs[0].appendChild(firstH4);

	const secondH4 = document.createElement("h4");
	const hText2 = document.createTextNode(array2);
	secondH4.appendChild(hText2);
	divs[1].appendChild(secondH4);

	console.log('------Array-------');
	console.log(array);
	console.log('------copyArray-------');
	console.log(array2);
}




