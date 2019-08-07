array = [17,2,6,5,3,4];

function print(){
	for (let i=0; i<array.length; i++){
	document.getElementById("num"+(i+1)).innerHTML=array[i];
	}	
}
function swap(){
	var temp = array[i];
		array[i] = array[j];
    	array[j] = temp;
		setTimeout(print,1000);
}     	
function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)]; 
        i = left, 
        j = right; 
    	setTimeout(print,1000);
while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(); 
	        i++;
            j--;
        }
	
    }
    return i;
}

function quickSort(array, left, right) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right); 
        if (left < index - 1) { 
            quickSort(array, left, index - 1);
        }
        if (index < right) { 
            quickSort(array, index, right);
        }
    }
    return array;
}

 quickSort(array, 0, array.length - 1);
 console.log(array);
