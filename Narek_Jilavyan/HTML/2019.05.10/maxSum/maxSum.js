var items = [123, 245, 3133, 99, 567, 624];
console.log(items);

function digitsSum(number) {
  let digites = 0;
  let wholePart = number;
  let digit = 0;
  let sum = 0;
  for (; wholePart > 0; wholePart = Math.floor(wholePart/10)){
    digit = wholePart%10;
    sum += digit;
  }
  return sum;
}

function maxSum (inputArray) {
  var sums = new Array(inputArray.length);
  var sortSums = new Array(inputArray.length);
  var result = new Array();
  for (let i = 0; i < inputArray.length; i++) {
    sums[i] = digitsSum(inputArray[i]);
  }
  sortSums = sums.sort(function(a, b){return a - b});
  for (let i = 0; i < inputArray.length; i++) {
    if (sortSums[inputArray.length-1] === digitsSum(inputArray[i])) {
      let count = result.push(inputArray[i]);
    }
  }
  return result;
}

console.log(maxSum(items));

