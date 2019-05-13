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
	for (let i = 0; i < A.lengths; i++) {
		if(sizeCol <  A[i].length) {
		sizeCol =  A[i].length;
		}
	}
	for (let i = 0; i < B.length; i++) {
		if(sizeCol <  B[i].length) {
			sizeCol =  B[i].length;
		}
	}
				
	const sizeRow = A.length > B.length ? A.length : B.length;
	const A1 = new Array(sizeRow);
	const B1 = new Array(sizeRow);
	const C = new Array(sizeRow);
	for(let i = 0; i < sizeRow; i++) {
		A1[i] = [];
		B1[i] = [];
		for(let j = 0; j < sizeCol; j++){
			if(i < A.length && j < A[i].length ) {
				A1[i].push(A[i][j]);
			}
			else {
				A1[i].push(1);
			}
			if(i < B.length && j < B[i].length ) {
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