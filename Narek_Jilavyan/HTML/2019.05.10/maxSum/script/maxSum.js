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

function maxSum () {
  var sums = new Array(items.length);
  var result = new Array();
  for (let i = 0; i < items.length; i++) {
    sums[i] = digitsSum(items[i]);
  }
  sums = sums.sort(function(a, b){return a - b});
  for (let i = 0; i < items.length; i++) {
    if (sums[items.length-1] === digitsSum(items[i])) {
      result.push(items[i]);
    }
  }
  return result;
}

console.log(maxSum());

