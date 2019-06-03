// Task 1
function copyArray(arr) {
    const copyArr = arr.slice(0); 
    return copyArr;
}
const arr = [4,5,[6,7]];
const copy = copyArray(arr);
copy.pop();
arr.push('a');
console.log('Task_1');
console.log(copy);
console.log(arr);

//Task 5
const div1 = document.getElementById('first');
const div2 = document.getElementById('second');
div1.onclick = function(event) {
    event.stopPropagation(); 
    return event.target.style.backgroundColor = 'blue';
}
div2.onclick = function(event) {
    event.stopPropagation(); 
    return event.target.style.backgroundColor = 'white';
}

//Task 4
function multiplyMatrix(M1,M2)
{
    const rowsM1 = M1.length;
    const rowsM2 = M2.length;
    const colsM2 = M2[0].length
    const result = [];
    let temp;
    for (let i = 0; i < rowsM1; i++) 
        {
            result[i] = [];
        }
    for (let k = 0; k < colsM2; k++) {
        for (let i = 0; i < rowsM1; i++) {
            temp = 0;
            for (let j = 0; j < rowsM2; j++) {
                temp += M1[i][j]*M2[j][k];
                result[i][k] = temp;
                if(isNaN(result[i][k])) {
                result[i].length =  result[i].length - 1;
                }
            }
        }
    }
    return result;
}
const M1 = [
    [1,2,1],
    [1,3,1],
    [1,1,1]
];
const M2 = [
    [1,2],
    [1,4,9,9],
    [4,3]
];
const result =  multiplyMatrix(M1,M2);
console.log('Task_4');
console.log(result);


//Task 3
function sum() {
    const arr = [];
    const result = [];
    const newArr = [];
    let max;
    let summa = 0;
    for(let i in arguments) {
        arr.push(arguments[i].toString());
        for (let j = 0; j < arr[i].length; j++) {
            summa = summa + parseInt(arr[i][j]);
        }
        newArr.push(summa);
        summa = 0; 
    }
    max = newArr[0];
    for(let i in newArr) {
        if(newArr[i] > max) {
            max = newArr[i];  
        }
    }
    for(let i in newArr) {
        if(newArr[i] === max) {
            result.push(Number(arr[i]));  
        }         
    }
    return result;  
}
var summa = sum(1899,12,25,999000,99,45,999,981,5,998,1,0,909090);
console.log('Task_3');
console.log(summa);


//Task 6
const countries = ['London','Amsterdam','Melburn','Kopenhagen','Boston','Bern','Keyptaun','Moscow','Las-Vegas','Agra',
                   'Barselona','Milan','Lissabon','Angola','Anguilla','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
                   'Kenya','Kiribati','Kosovo','Mexico','Micronesia','Lebanon','Lesotho','Liberia','Namibia','Nauro','Nepal']; 
function autocomplete(inp, arr) {
    inp.addEventListener('input', function() {
        let div1;
        let div2;
        let val = this.value;
        closeAllLists();
        div1 = document.createElement('div');
        div1.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(div1);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              div2 = document.createElement('div');
              div2.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
              div2.innerHTML += arr[i].substr(val.length);
              div1.appendChild(div2);
            }
        }
    });  
    function closeAllLists(element) {
        const close = document.getElementsByClassName('autocomplete-items');
        for (let i = 0; i < close.length; i++) {
            if (element != close[i] && element != inp) {
                close[i].parentNode.removeChild(close[i]);
            }
        }
    }
}
autocomplete(document.getElementById('myInput'), countries);


//Task 2
function reverse(string) {
    for(let i = 0; i < string.length; i++) {
        const ind = string.indexOf('g');
        const indexG = string.indexOf('G');
        if(ind === -1 && indexG === -1) {
            break;
        }
        const newstr = string.substring(0, indexG)
        const newIndex = newstr.indexOf('g');
        const firstPart = string.substring(0, newIndex);
        const reverse = string.substring(newIndex + 1, indexG).split('').reverse().join('');
        const lastPart = string.substring(indexG + 1, string.length);
        string = firstPart.concat(reverse,lastPart);
    }
    return string;
}
console.log('Task_2');
var string = 'mnpganGostgGamgGgdomGlk';
console.log(string);
console.log(reverse(string));






