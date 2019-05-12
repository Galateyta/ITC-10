var items = [[1, 2], 3, 4,[5, 6]];
console.log(items);

function copy (inputArray) {
  return(inputArray.slice(0, inputArray.lenght));
}

let newArr = copy(items);
console.log(newArr);
