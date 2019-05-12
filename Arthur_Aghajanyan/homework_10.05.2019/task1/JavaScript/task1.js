const array = ['hello', 1,['a','b',['v',1]], 'world', '88', '-45'];

function copyArray(arr){
    secondArray = [];
    for(let i = 0; i < arr.length; i++){

        secondArray[i] = arr[i];
    }
    return secondArray;
}
secondArray = copyArray(array);
document.getElementById('demo').innerHTML = 'Origin_Array -  ' + array + '<br><br>' + 'Copy_Array -  '+ secondArray ;
