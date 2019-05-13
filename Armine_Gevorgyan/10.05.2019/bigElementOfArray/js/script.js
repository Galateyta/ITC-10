function arrayOfBiggerCount( a ) {
	const arr=[];
	let preCount = 0;
	for (let i = 0; i < arguments.length; i++) {
		let count = 0;
		const str = arguments[i].toString();
		const size = str.length;
		for (let j = 0; j < size; j++) {
			count = count + + str[j];
		}
	
		if(!isNaN(count)) {
			if(count > preCount && preCount !== 0 ) {
				preCount = count;
				arr.splice(0, arr.length); 
				arr.push(arguments[i]);
				}
				else if(preCount === count || preCount === 0) {	
					preCount = count;
					arr.push(arguments[i]);
				}
			}
		}
		console.log(arr);
	}
arrayOfBiggerCount( 33,25,16,52,43,142, 3677711111111111111111177777777777777777);