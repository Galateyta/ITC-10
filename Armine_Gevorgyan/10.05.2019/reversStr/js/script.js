let str='g123g456G789g101112GGG';		
function reverseString(str) {
	while (str.indexOf('G', 0) != -1 && str.indexOf('g', 0) !== -1) {
		const firstIndex = str.indexOf('G', 0);
		const lastIndex = str.lastIndexOf('g', firstIndex);
	    const newStr = str.slice(lastIndex + 1, firstIndex).split('').reverse().join('');
	    str = str.slice(0, lastIndex) +newStr + str.slice(firstIndex + 1); 
	}
	return str;
}
let str1 = reverseString(str);
console.log(str1);	
