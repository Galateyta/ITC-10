
document.getElementById('out').addEventListener('click', function(){
    this.style.backgroundColor = 'blue';
});
document.getElementById('in').addEventListener('click', function(e){
    e.stopPropagation();
    this.style.backgroundColor = 'white';
});

