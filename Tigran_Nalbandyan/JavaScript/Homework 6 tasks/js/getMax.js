function getNumbersSum(number) {
	let count = 0;
	for (n of number.toString()) {
		count += parseInt(n);
	}
	return count;
}

function getMax() {
    let max = getNumbersSum(arguments[0]);
    let numbers = [];

    for (n of arguments) {
    	let numbersSum = getNumbersSum(n);
        if (numbersSum > max) {
            max = numbersSum;
        }
    }

    for (let i = 0; i < arguments.length; i++) {
    	let n = arguments[i];
        if (getNumbersSum(n) === max) {
            numbers.push(n);
        }
    }

    return numbers;
}

console.log(getMax(1,2,322,41,5));