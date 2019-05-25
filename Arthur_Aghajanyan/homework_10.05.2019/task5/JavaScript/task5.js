const redDiv = document.getElementById('redDiv');
redDiv.addEventListener('click', clickDiv);
const blackDiv = document.getElementById('blackDiv');
blackDiv.addEventListener('click', clickDiv);

function clickDiv(event) {
    if(event.srcElement.id === 'redDiv'){
        redDiv.style.backgroundColor = 'blue';
    } else if (event.srcElement.id === 'blackDiv') {
        blackDiv.style.backgroundColor = 'white';
    }
}
