function max() {
    let max = arguments[0];
    for (el of arguments) {
        if (el > max) {
            max = el;
        }
    }
    return max;
}

const arr1 = [
    [1, 2, 3, 4],
    [4, 5, 6, 5],
    [7, 8, 9, 6]
];
const arr2 = [
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1]
];

const arr = [];

for (let i = 0; i < max(arr1.length, arr2.length); i++) {
    tempArr = [];
    for (let j = 0; j < max(arr1[i].length, arr2[i].length); j++) {
        let s = 0;
        for (let k = 0; k < max(arr1[i].length, arr2[i].length, arr1.length, arr2.length); k++) {
            let a = 1;
            let b = 1;
            try {
                if (arr1[i][k] != undefined) {
                    a = arr1[i][k];
                }
            } catch (e) {}
            try {
                if (arr2[k][j] != undefined) {
                    b = arr2[k][j];
                }
            } catch (e) {}
            s += a * b;
            if (isNaN(s)) {
                s = a;
            }
        }
        tempArr.push(s);
    }
    arr.push(tempArr);
}

console.log(arr);