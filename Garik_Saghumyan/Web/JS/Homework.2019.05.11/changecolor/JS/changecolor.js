
function parentEnvent(){
    document.getElementById('out').style.backgroundColor = 'blue';
}
function childEvent(){
    document.getElementById('in').style.backgroundColor = 'white';
}
document.getElementById('out').addEventListener('click', parentEnvent, false);
document.getElementById('in').addEventListener('click', childEvent, true);

