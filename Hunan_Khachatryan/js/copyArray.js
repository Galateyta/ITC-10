const arr1 = [3,[2,1]];

function copyArray(arr){
return arr.slice();
}

let arr2 = copyArray(arr1);
arr2[0] = 2;

console.log(arr1);
console.log(arr2);
