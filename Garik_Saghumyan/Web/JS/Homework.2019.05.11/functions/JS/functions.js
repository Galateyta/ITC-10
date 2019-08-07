/**
 * @param {*} arr
 * This function gets an array as argument and returns 
 * clone of the current array 
 */
function copyArray(arr) {
    const newArray = [];
    for (let i = 0; i < arr.length; i++){
        if(arr[i].length > 1){
            newArray[i] = arr[i].slice();
        } else {
            const temp = arr[i];
            newArray.push(temp);
        }
    }
    return newArray;
}
console.log(copyArray([3 , [1, 2]]));


/**
 * 
 * @param {*} str
 * This function gets a string as argument, reverses 
 * part of string between all 'g' and 'G' symbols and returns modified string
 */
function reverseString(str) {
    while (true){
        const close = str.indexOf('G');
        if(close === -1){
            break;
        }
        const open = str.substring(0, close).lastIndexOf('g');
        const start = str.substring(0, open);
        const middle = str.substring(open + 1, close).split('').reverse().join('');
        const end = str.substring(close + 1, str.length);
        str = start + middle + end;
    }
    return str;
}
console.log(reverseString('abcgdfGgagfeGG'));


/**
 * This function gets numbers as an arguments amd
 * returns those numbers the sum of characters which is the biggest 
 */
function sumOfNumbers() {
    const arr = [];
    const maxArr = [];
    for( let i = 0; i < arguments.length; i++ ){
        let sum = 0;
        const chars =  arguments[i].toString().split('');
        for(let j = 0; j < chars.length; j++){
            sum += parseInt(chars[j]);
        }
        arr.push(sum);
    }
    let max = arr[0];
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++){
        if(arr[i] >= max){
            maxIndex = i;
        }
    }
    for(let i = 0; i <= arr.length; i++){
        if (arr[i] === arr[maxIndex]){
            maxArr.push(arguments[i]);
        }
    }
    return maxArr; 
}
console.log(sumOfNumbers(15 , 122 ,19, 154, 145, 1111));


/**
 * 
 * @param {*} mat1 
 * @param {*} mat2 
 * This function gets two two-dimensional arrays as an argument multiplies the arrays 
 * and returns a new array
 */

function multiplyMatrix(mat1, mat2){
    const result = [];
    for (let i = 0; i < mat1.length; i++){
        result[i] = [];
        for (let j = 0; j < mat2[0].length; j++){
            let sum = 0;
            for (let k = 0; k < mat1[0].length; k++){
                if(mat1[i][k] === undefined){
                    mat1[i][k] = 1;
                }else if(mat2[k][j] === undefined){
                        mat2[k][j] = 1;
                }
                sum += mat1[i][k] * mat2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}
console.log(multiplyMatrix([[2, 3, 1], [2, -7, 4]], [[3, 4, 5], [1, 1, 4], [2, 1, 4]]));