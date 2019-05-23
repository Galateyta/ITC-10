function matrix(n, m) {
	let arr = new Array(n);
	for(let i = 0; i < n; i++){
		arr[i] = [];
		for(let j = 0; j < m; j++){
			arr[i].push(Math.floor(Math.random()* (9) + 1));
		}
	}
	return arr;
}
const A = matrix(3,5);
const B = matrix(4,3);
B[1] = [4,2,5,4,7,8,9];
console.log('Matrix A:',A);
console.log('Matrix B:',B);
		
function MultiplyMatrix(A,B) {
	let sizeCol = 0;
	const sizeA = A.length;
	const sizeB = B.length;
	for (let i = 0; i < sizeA; i++) {
		const sizeI = A[i].length;
		if(sizeCol < sizeI ) {
			sizeCol =  sizeI;
		}
	}
	for (let i = 0; i < sizeB; i++) {
		const sizeI = B[i].length;
		if(sizeCol <  sizeI) {
			sizeCol =  sizeI;
		}
	}
				
	const sizeRow = A.length > B.length ? A.length : B.length;
	const A1 = new Array(sizeRow);
	const B1 = new Array(sizeRow);
	const C = new Array(sizeRow);
	for(let i = 0; i < sizeRow; i++) {
		A1[i] = [];
		B1[i] = [];
		sizeA = A.length;
	        sizeB = B.length;
		sizeA_i = A[i].length;
	        sizeB_i = B[i].length;
		for(let j = 0; j < sizeCol; j++){
			if(i < sizeA && j < sizeA_i ) {
				A1[i].push(A[i][j]);
			}
			else {
				A1[i].push(1);
			}
			if(i < sizeB && j < sizeB_i ) {
				B1[i].push(B[i][j]);
			}
			else {
				B1[i].push(1);
			}
		}
	}
				
	for (let i = 0; i < sizeRow; i++) {
		C[ i ] = [];
	}
				
	for (let k = 0; k < sizeCol; k++) {
		for (let i = 0; i < sizeRow; i++) {
			let t = 0;
			for (let j = 0; j < sizeRow; j++) {
				t += A1[ i ][j]*B1[j][k];
				C[ i ][k] = t; 
			}
		}
	}
	console.log('Matrix A*B:',C);
}
MultiplyMatrix(A, B);
