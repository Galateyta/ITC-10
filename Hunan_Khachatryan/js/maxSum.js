
function findMax() {
  
  let maxsum = 0;
  var arr = [];
  for(let i = 0; i < arguments.length; i++) {
  	let sum = 0;
  	let number=arguments[i];
 	while(number > 0){
 	sum += number%10;
  	number = Math.floor(number /10);
 	}
 	
 	if (sum > maxsum) {
     	 maxsum = sum;
    	}
      
  }
 
 for(i = 0; i < arguments.length; i++) {
  	let sum = 0;
  	let number=arguments[i];
 	while(number > 0){
 	sum += number%10;
  	number = Math.floor(number /10);
 	}
 	if (sum === maxsum) {
      arr.push(`${arguments[i]}`);
     }
        
  }
  return arr;
}

let aray = findMax(15,93,54,66,453);
console.log(aray);
