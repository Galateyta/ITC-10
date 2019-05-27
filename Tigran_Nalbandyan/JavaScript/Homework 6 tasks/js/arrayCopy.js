function arrayCopy(arr) {
    let newArr = arr.map(function(el) {
        if (typeof(el) == 'object') {
            return el.slice();
        } else {
            return el;
        }
    });

    return newArr;
}

let a = [1, 2, [3, 4]];

let b = arrayCopy(a);