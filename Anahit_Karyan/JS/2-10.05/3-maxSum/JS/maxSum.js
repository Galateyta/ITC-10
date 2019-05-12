function maxSum (num) {
	let sum = 0;
	while(num) {
		sum += num % 10;
		num = Math.floor(num /= 10);
	}
	return sum;
}
function isNumber(num) {
     return num === +num;
}

function maxSumOfDigits (arr) {
	if(!isNumber(Number(arr[0]))){
			return 'Write only numbers';
    } else {
		let maximum = maxSum(arr[0]);
		let array = [arr[0]];
		for (i = 1; i < arr.length; i++) {
			if(!isNumber(Number(arr[i]))){
				return 'Write only numbers';
			} else if (maxSum(arr[i]) > maximum) {
	    		array = [arr[i]];
	    		maximum = maxSum(arr[i]);
	    	} else if (maxSum(arr[i]) === maximum) {
	    		array.push(arr[i]);
	    	} 
	    }
	    return array;
	}
}
//............................................................
function start() {
	const array = prompt("Enter your variables ','").split(",");
	const array2 = maxSumOfDigits(array);

	const divs = document.getElementsByTagName("div");
	const firstH4 = document.createElement("h4");
	const hText1 = document.createTextNode(array);
	firstH4.appendChild(hText1);
	divs[0].appendChild(firstH4);

	const secondH4 = document.createElement("h4");
	const hText2 = document.createTextNode(array2);
	secondH4.appendChild(hText2);
	divs[1].appendChild(secondH4);
}
//......................nuynn consolum
function maxSumOfDigits1 ( num1, num2, num3, num4) {
	let maximum = maxSum(arguments[0]);
	let array = [arguments[0]];
	for (i = 1; i < arguments.length; i++) {
		if(!isNumber(arguments[i])){
			return 'Write only numbers';
		} else if (maxSum(arguments[i]) > maximum) {
    		array = [arguments[i]];
    		maximum = maxSum(arguments[i]);
    	} else if (maxSum(arguments[i]) === maximum) {
    		array.push(arguments[i]);
    	} 
    }
    return array;
}

console.log(125, 11, 23, 230, 210, 800, 404)
console.log(maxSumOfDigits1(125, 11, 120, 230, 210, 800, 404));



