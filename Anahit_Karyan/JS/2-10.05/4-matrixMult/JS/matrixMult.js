const matrix1 = [
				 [2, 3, 9],
				 [1, 8, 0],
				 [1, 2, 0]
				];
const matrix2 = [
				 [4, 3],
				 [5, 1, 2],
				 [2, 2]
				];
//Checks the number of rows and columns
function check (matrix1, matrix2) {
	if(matrix1.length !== matrix2[0].length) {
		return false;
	} else {
		return true;
	}
}
//Fill the ampty fields by 1
function changeMatrix (matrix) {
	let maxLen = matrix[0].length;
	for (let i = 1; i < matrix.length; ++i) {
		if (matrix[i].length > maxLen) {
			maxLen = matrix[i].length;
		}
	} 
	matrix.forEach(function(element) {
    	for(let i = 0; i < maxLen; ++i) {
    		if (element[i] === undefined) {
    			element[i] = 1;
    		}
    	}
	});
}
function matrixMult (matrix1, matrix2) {
	changeMatrix (matrix1);
	changeMatrix (matrix2);
	if (!check (matrix1, matrix2)) {
		return 'These matrixes cannot be multiplied,since the number  row of first  is not equal to the number of columns of the second';
	} else {
		const matrixResult = [];
		for (let i = 0; i < matrix1.length; ++i) {
			const row = [];
			for (let j = 0; j < matrix1.length; ++j) {
				let item = 0;
				for (let k = 0; k < matrix2.length; ++k) {
					item += matrix1[i][k] * matrix2[k][j];		
				}
				row.push(item);
			}
			matrixResult.push(row);
		}
		return matrixResult;
	}
}
console.log(matrixMult(matrix1, matrix2));
