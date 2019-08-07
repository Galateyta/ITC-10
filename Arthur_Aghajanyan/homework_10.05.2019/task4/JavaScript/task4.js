const arr1 = [[1,2,7],[3,4,8],[5,6,9]];
const arr2 = [[9,10,15],[11,12,16],[13,14,17],[,55,66]];

function multiplyMatrix(array1, array2) {
    let newArrayRow = array1.length;
    let newArrayCol = array2.length;

    const matrix = new Array(newArrayRow);
    for(let i = 0; i < newArrayRow; i++){
        matrix[i] = new Array(newArrayCol);
    }
    for(let i = 0; i < newArrayRow; i++) {
        for(let j = 0; j < newArrayCol; j++) {
            if(typeof(array1[i][j]) === 'undefined'){
                matrix[i][j] = array2[j][i];
            }else if(typeof(array2[j][i]) === 'undefined'){
                matrix[i][j] = array1[i][j];
            }else{
                matrix[i][j] = array1[i][j] * array2[j][i];
            }
        }
    }
    return matrix;
}

const matrix = multiplyMatrix(arr1,arr2);
matrix.toString();
document.getElementById('pId').innerHTML = 'arr1 = ' + arr1 + '<br>arr2 = ' + arr2 + '<br>matrix = arr1 * arr2 = ' + matrix;
