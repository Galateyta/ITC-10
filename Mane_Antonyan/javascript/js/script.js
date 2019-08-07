function changeToBlue() {
    let element = document.getElementById('big');
    if (element.style.backgroundColor == "blue") {
        element.style.backgroundColor = "red";
    } else {
        element.style.backgroundColor = "blue";
    }
    event.stopPropagation();
}

function changeToWhite() {
    let element = document.getElementById('small');
    if (element.style.backgroundColor == "white") {
        element.style.backgroundColor = "black";
    } else {
        element.style.backgroundColor = "white";
    }
    event.stopPropagation();
}