function changing(input) {
	const divElement = document.getElementById('myDiv');
	for(let i of divElement.children) {
		const m = input.value;
		if(i.innerText.indexOf(input.value)){
			i.style.display = 'none';					
		}
		else {
			i.style.display = 'block';	
		}
	}
} 
