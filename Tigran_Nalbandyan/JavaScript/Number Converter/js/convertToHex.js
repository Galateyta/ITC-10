function binaryToHex(n) {
    n = n.toString();

    n = pad(n, 4);

    let binaryArr = [];
    let hexArr = [];

    for (let i = 0; i < n.length; i += 4) {
        binaryArr.push(n.substring(i, i + 4));
    }

    for (let i = 0; i < binaryArr.length; i++) {
        hexArr.push(parseInt(binaryArr[i], 2).toString(16).toUpperCase());
    }

    return [binaryArr, hexArr.join('').toUpperCase(), zip(binaryArr, hexArr)];
}

function pad(n, count) {
    let s = n.toString();
    let size;

    if (n.length % count != 0) {
        if (n.length > count) {
            size = n.length + (count - (n.length % count));
        } else {
            size = count;
        }
    } else {
        size = n.length;
    }

    while (s.length < size) {
        s = '0' + s;
    }
    return s;
}

function zip(arr1, arr2) {
    let arr = [];
    for (let i = 0; i < arr1.length; i++) {
        arr.push([arr1[i], arr2[i]]);
    }

    return arr;
}

function createBinary(binaryArr, id) {
    let span = document.getElementById('binary-' + id);
    span.textContent = 'Result: ' + binaryArr.join(' ');
}

function convertToHex(n) {
    const id = 'b2h';
    const tableHeaders = ['Binary', 'Hex'];

    let result = binaryToHex(n);
    let binaryArr = result[0];
    createBinary(binaryArr, id);

    let hex = result[1];
    let steps = result[2];
    let hexes = createTable(steps, id, tableHeaders);
    createResult(hex, hexes, id)
}