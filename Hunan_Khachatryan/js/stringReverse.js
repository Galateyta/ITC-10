function reverseString(inputString) {
    var wordbegin = 0;
    var wordend = inputString.length - 1;
    for (let i = 0; i < inputString.length; ++i) {
        if (inputString[i] === 'g')
            wordbegin = i;
        if (inputString[i] === 'G') {
            wordend = i;
            const temp = inputString.slice(wordbegin + 1, wordend).split("").reverse().join("");
            return reverseString(inputString.slice(0, wordbegin) + temp + inputString.slice(wordend + 1));
        }
    }
    return inputString;
}


const str = 'asgasdgadGadmarasGsa';

const revStr = reverseString(str);
console.log(str);
console.log(revStr);

