function matrix(first, firstRow, firstColumn, second, secondRow, secondColumn) {
    if (firstRow === secondColumn) {
        size = secondColumn;
        matrix = [];
        for (var i = 0; i < size; ++i) {
            matrix[i] = [];
        }

        var k = 0, j = 0;
        for (i = 0; i < size; ++i) {
            for (var j = 0, k = 0; ; ++j, ++k) {
                if (j < firstColumn && k < secondRow) {
                    matrix[i][j] = first[i][j] * second[k][i];
                } else if (j >= firstColumn && k < secondRow) {
                    matrix[i][j] = second[k][i];
                } else if (j < firstColumn && k >= secondRow) {
                    matrix[i][j] = first[i][j];
                } else {
                    break;
                }
            }
        }

        return matrix;

    } else {
        return "Warning!!!";
    }
}

first = [];
for (var i = 0; i < 5; ++i) {
    first[i] = [];
    for (var j = 0; j < 2; ++j) {
        first[i][j] = Math.floor(Math.random() * 1000);
    }
}

second = [];
for (var i = 0; i < 2; ++i) {
    second[i] = [];
    for (var j = 0; j < 5; ++j) {
        second[i][j] = Math.floor(Math.random() * 1000);
    }
}

console.log("**** first ****")
console.log(first);
console.log("**** second ****");
console.log(second);
console.log();
console.log("****** FINALY ******");
console.log(matrix(first, 5, 2, second, 2, 5));
