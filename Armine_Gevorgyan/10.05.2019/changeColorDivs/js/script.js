div1.onclick = function(event) {
	if( event.target.id == 'div1'){
		event.target.style.backgroundColor = 'red';
	}else {
		event.target.style.backgroundColor = 'black';
	}
	setTimeout(function (){
		event.target.style.backgroundColor = '';
	}, 500);
}
