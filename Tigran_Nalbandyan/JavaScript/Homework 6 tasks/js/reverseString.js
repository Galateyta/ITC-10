function reverseString(argument) {
    let open = [];
    stringArr = string.split('');

    for (let i = 0; i < stringArr.length; i++) {
        let el = stringArr[i];
        if (el === 'g') {
            open.push(i);
        } else if (el === 'G') {
            stringArr[i] = '';
            let openIndex = open.pop();
            stringArr[openIndex] = '';
            stringArr = stringArr.slice(0, openIndex).concat(stringArr.slice(openIndex, i).reverse()).concat(stringArr.slice(i));
        }
    }
    return stringArr.join('');
}

const string = 'asgerttgasdgujlGiujGdssds';
const newString = reverseString(string);

console.log(string);
console.log(newString);