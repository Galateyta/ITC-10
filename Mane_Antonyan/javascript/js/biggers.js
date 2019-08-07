function bigger() {
    const count = arguments.length;
    const array = Array.apply(null, new Array(arguments.length)).map(Number.prototype.valueOf, 0);

    for (var i = 0, tmp = 0; i < count; ++i, tmp = Math.abs(arguments[i])) {
        do {
            array[i] += tmp % 10;
            tmp = Math.floor(tmp / 10);
        } while (tmp > 0);
    }

    var max = array[0];
    for (i = 1; i < count; ++i) {
        if (max < array[i]) {
            max = array[i];
        }
    }

    var returnArray = [];
    for (var i = 0, j = 0; i < count; ++i) {
        if (max === array[i]) {
            returnArray[j++] = arguments[i];
        }
    }

    return returnArray;
}

var a = [];
a = bigger(10, 45, 89, 188, 45, 9, 0, 23, 34, 8, 98, -188);
console.log(a);