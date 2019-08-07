const n = 5;
		const arr = new Array(n);
		for(let i = 0; i < n; i++){
		    arr[i] = [];
			for(let j = 0; j < n; j++){
				arr[i].push(i.toString() + j.toString());
			}
		}

		function copyArray( arr){
			return [...arr];
		}
		
		const copyArr = copyArray(arr);
		arr[2]=[77,99];
		
		console.log(arr);
		console.log(copyArr);