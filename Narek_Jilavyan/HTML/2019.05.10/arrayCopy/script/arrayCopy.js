var items = [[1, 2], 3, 4,[5, 6]];
console.log(items);

function copy() {
  return(items.slice(0, items.lenght));
}

const newArr = copy();
console.log(newArr);

