"use strict"

document.getElementById('div1').addEventListener('click', function() {
   this.style.backgroundColor = 'blue';
});
document.getElementById('div2').addEventListener('click', function(e) {
   e.stopPropagation();
   this.style.backgroundColor = 'white';
});

