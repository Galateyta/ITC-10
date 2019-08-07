function binaryToOctal(n) {
    n = n.toString();

    n = pad(n, 3);

    let binaryArr = [];
    let hexArr = [];

    for (let i = 0; i < n.length; i += 3) {
        binaryArr.push(n.substring(i, i + 3));
    }

    for (let i = 0; i < binaryArr.length; i++) {
        hexArr.push(parseInt(binaryArr[i], 2).toString(8));
    }

    return [binaryArr, hexArr.join('').toUpperCase(), zip(binaryArr, hexArr)];
}

function convertToOctal(n) {
    const id = 'b2o';
    const tableHeaders = ['Binary', 'Octal'];

    let result = binaryToOctal(n);
    let binaryArr = result[0];
    createBinary(binaryArr, id);

    let hex = result[1];
    let steps = result[2];
    let hexes = createTable(steps, id, tableHeaders);
    createResult(hex, hexes, id)
}