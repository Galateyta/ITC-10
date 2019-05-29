const arr1 = [3, [2, 1]];

function copyArray(arr) {
    const copyArr = [];
    for (let i = 0; i < arr.length; ++i) {
        if (!Array.isArray(arr[i])) {
            copyArr.push(arr[i]);
        } else {
            copyArr.push(copyArray(arr[i]));
        }
    }
    return copyArr;
}

var arr2 = copyArray(arr1);
arr2[0] = 2;

console.log(arr1);
console.log(arr2);
