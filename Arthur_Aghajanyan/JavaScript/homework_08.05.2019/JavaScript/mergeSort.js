
function start() {
    console.log('click');
    const unsortedArray = [1, 4, 11, 2, 5, 9, 66, 21, 43, -55, 0];
    console.log(mergeSort(unsortedArray));
}

function createUiElement(splitedArray) {
    for (let i = 0; i < splitedArray.length; i++) {
        let button = document.createElement('button');
        button.setAttribute('class', 'my_buttons');
        button.innerHTML = splitedArray[i];
        document.getElementById('mergeBody').appendChild(button);
    }

    let br = document.createElement('br');
    document.getElementById('mergeBody').appendChild(br);
}

function mergeSort(array) {

    if (array.length === 1) {
        return array;
    }
    const middle = parseInt(array.length / 2);
    const leftArray = array.slice(0, middle);
    const rightArray = array.slice(middle, array.length);
    createUiElement(array);

    return merge(mergeSort(leftArray), mergeSort(rightArray));

}

function merge(leftArray, rightArray) {
    const result = [];

    while(leftArray.length && rightArray.length) {
        if (leftArray[0] <= rightArray[0]) {
            result.push(leftArray.shift());
        } else {
            result.push(rightArray.shift());
        }
    }

    while(leftArray.length) {
        result.push(leftArray.shift());
    }
    createUiElement(result);
    while(rightArray.length) {
        result.push(rightArray.shift());
    }
    createUiElement(result);
    return result;
}
