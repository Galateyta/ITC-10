

//Task 4
function multiplyMatrix(matrix1,matrix2)
{
    const rowsM1 = matrix1.length;
    const rowsM2 = matrix2.length;
    const colsM2 = matrix2[0].length
    const result = [];
    let temp;
    for (let i = 0; i < rowsM1; i++) 
        {
            result[i] = [];
        }
    for (let k = 0; k < colsM2; k++) {
        for (let i = 0; i < rowsM1; i++) {
            temp = 0;
            for (let j = 0; j < rowsM2; j++) {
                temp += matrix1[i][j]*matrix2[j][k];
                result[i][k] = temp;
                if(isNaN(result[i][k])) {
                result[i].length =  result[i].length - 1;
                }
            }
        }
    }
    return result;
}
const matrix1 = [
    [1,2,1],
    [1,3,1],
    [1,1,1]
];
const matrix2 = [
    [1,2],
    [1,4,9,9],
    [4,3]
];
const result =  multiplyMatrix(matrix1,matrix2);
console.log('Task_4');
console.log(result);


//Task 6
const countries = ['London','Amsterdam','Melburn','Kopenhagen','Boston','Bern','Keyptaun','Moscow','Las-Vegas','Agra',
                   'Barselona','Milan','Lissabon','Angola','Anguilla','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
                   'Kenya','Kiribati','Kosovo','Mexico','Micronesia','Lebanon','Lesotho','Liberia','Namibia','Nauro','Nepal']; 
function autocomplete(inp, arr) {
    inp.addEventListener('input', function() {
        const div1;
        const div2;
        let val = this.value;
        closeAllLists();
        div1 = document.createElement('div');
        div1.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(div1);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
              div2 = document.createElement('div');
              div2.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
              div2.innerHTML += arr[i].substr(val.length);
              div1.appendChild(div2);
            }
        }
    });  
    function closeAllLists(element) {
        const close = document.getElementsByClassName('autocomplete-items');
        for (let i = 0; i < close.length; i++) {
            if (element !== close[i] && element !== inp) {
                close[i].parentNode.removeChild(close[i]);
            }
        }
    }
}
autocomplete(document.getElementById('myInput'), countries);







