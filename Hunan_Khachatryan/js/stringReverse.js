function reverseString( inputString)
{
    let wordbegin = 0;
    let wordend = inputString.length - 1;
    for(let  i = 0; i < inputString.length; ++i)
    {
        if(inputString[i] == 'g')
            wordbegin = i;
        if(inputString[i] == 'G')
        {
            wordend = i;
           let temp = inputString.slice(wordbegin + 1, wordend ).split("").reverse().join("");
            return reverseString(inputString.slice(0, wordbegin) + temp + inputString.slice(wordend + 1));
         }
    }
    return inputString;
}


const str='asgasdgadGadmarasGsa';

let revStr=reverseString(str);
console.log(str);
console.log(revStr);

