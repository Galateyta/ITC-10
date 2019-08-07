function start() {
    const temp = maxSumDigit([77777,8],7,5,[88,99999999],[9999,[9999999999,9,[8,[999999999999,9],11],99],8]);

    function sumDigits(number){
        let summa = 0;
        while (number) {
            summa += number % 10;
            number = Math.floor(number / 10);
        }
        return summa;
    }

    function maxSumDigit(){
        let max = 0;
        for(let i = 0; i < arguments.length; i++){

            if(Array.isArray(arguments[i])){
                let temp = maxSumDigitArray(arguments[i]);
                if(max < temp){
                    max = temp;
                }
            }

            if((max < sumDigits(arguments[i])) && (typeof(arguments[i] === 'number'))){
                max = sumDigits(arguments[i]);
            }
        }
        return max;
    }
    function maxSumDigitArray(array){
        let maxSumDigitArrayElement = 0;
        let index = 0;
        for(let i = 0; i < array.length; i++){

            if(Array.isArray(array[i])){
                let temp = maxSumDigitArray(array[i]);
                if(maxSumDigitArrayElement < temp){
                    maxSumDigitArrayElement = temp;
                }
            }
            let help = sumDigits(array[i]);
            if(maxSumDigitArrayElement < help){
                maxSumDigitArrayElement = help;
            }
        }
        return maxSumDigitArrayElement;
    }
    document.getElementById('pId').innerHTML = temp;
}
