function onChange(input) {
	let div = document.getElementById('paragrafs');
	for (p of div.children) {
		if (input.value !== p.innerText.substring(0, input.value.length)) {
			console.log(p.innerText);
			p.style.display = 'none';
		} else {
			p.style.display = 'block';
		}
	}
}