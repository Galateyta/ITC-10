const p = document.getElementsByTagName('p');

function start() {
  for (let i = 0; i < p.length; i++) {
    p[i].style.display = 'block';
  }
}

function search(searchingText){
        start();
	const len = searchingText.length;
	for (let i = 0; i < p.length; i++) {
		console.log(p[i].textContent.substr(0, len + 1));
		console.log(searchingText);
  		if(p[i].textContent.substr(0, len) !== searchingText) {
  			p[i].style.display = 'none';
  		} 
	}
}

