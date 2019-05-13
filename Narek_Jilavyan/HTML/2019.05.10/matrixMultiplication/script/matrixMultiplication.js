var matrix1 = [[1, , 3], [4, 5, 6], [7, 8, 9]];
var matrix2 = [[1, 2, 3], [5, , 7], [9, 10, 11], [12, 13, 14]];

console.log(matrix1);
console.log(matrix2);

function copy (matrix1, matrix2) {
  var result = new Array();
  for (let i = 0; i < matrix1.length; i++) {
    var resultRow = new Array();
    for (let k = 0; k < matrix2[0].length; k++) {
      let multy = 0;
      for (let j = 0; j < matrix1[0].length; j++) {
        if (matrix1[i][j] === undefined) {
          matrix1[i][j] = 1;
        }
        if (matrix2[j][k] === undefined) {
          matrix2[j][k] = 1;
        }
        multy += (matrix1[i][j] * matrix2[j][k]);  
      }
      resultRow.push(multy);
    }
    result.push(resultRow);
  }
  return result
}

let newArr = copy(matrix1, matrix2);
console.log(newArr);
