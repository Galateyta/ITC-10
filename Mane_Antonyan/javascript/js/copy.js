function arrayCopy(array) {
    var size = array.length;
    const cpArray = [];
    for (var i = 0; i < size; ++i) {
        cpArray[i] = [];
    }
    
    for (var i = 0; i < size; ++i) {
        cpArray[i] = array[i];
    }

    return cpArray;
}

const array = [1, 5, 9, [2, 3], 8];
var arr = arrayCopy(array);
console.log(arr);