const firstMatrix = [[2,3,4],[5,4,4],[4,3,5]];
const secondMatrix = [[2,4,7],[2,4,5],[3,1,4]];

function mulMatrix (first,second){

	let matr =new Array(first.length);
	for (let i = 0; i < first.length; ++i){
		matr[i]=new Array(second.length);
		for (let j = 0; j < first[i].length; ++j){
		let sum = 0;
			for(let k = 0; k < first.length; ++k){
			if(first[i][k] === undefined){
			  sum += second[k][j];
			}
			else if (second [k][j] === undefined){
			 sum += first[i][k];
			}
			else{
		 	sum +=  first[i][k]*second[k][j];
			}
		
		}
		matr[i][j] = sum;
		} 
	
	}
return matr;
}

let mat=mulMatrix(firstMatrix,secondMatrix);

mat.forEach(function(item,index){
console.log(index,item);
});
