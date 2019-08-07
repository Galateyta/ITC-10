
const p = document.getElementsByTagName('p');

function search(value){
	for (let i = 0; i < p.length; i++) {
		p[i].style.display = 'block';
	}
	const len =value.length;
	for (let i = 0; i < p.length; i++) {
		console.log(p[i].textContent.substr(0, len + 1));
		console.log(value);
  		if(p[i].textContent.substr(0, len) != value) {
  			p[i].style.display = 'none';
  		} 
	}
}
