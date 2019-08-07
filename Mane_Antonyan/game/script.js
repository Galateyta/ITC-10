function start() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('step').style.display = 'block';
    document.getElementById('move').style.display = 'block';
    document.getElementById('board').style.display = 'block';  
    createTable();
}

function stepsCount() {
    if (document.getElementById('step').innerHTML == 'White player step') {
        document.getElementById('step').innerHTML = 'Black player step';
    } else {
        document.getElementById('step').innerHTML = 'White player step';
    }
    document.getElementById('step').style.color = 'White';
    document.getElementById('step').style.fontSize = 'large';
    document.getElementById('step').style.margin = '10px 10px 20px 30px';
}

const whiteFigureCharCode = '&#9865';
const blackFigureCharCode = '&#9865';
const emptyFigureCharCode = '';

function createTable() {
    let table = "<table class='table'>";
    const count = 8;
    for (let i = 0; i < count; ++i) {
        table += '<tr>';
        for (let j = 0; j < count; ++j) {
            if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
                table += "<td onclick='clickFigure(this)' class='black' id='" + i.toString() + j + "'>";
                if (i < 3) {
                    table += '&#9865</td>';
                } else if (i > 4) {
                    table += '&#9865</td>';
                } else {
                    table += '</td>';
                }
            } else {
                table += "<td onclick='clickFigure(this)' class='white' id='" + i.toString() + j + "'>" + '</td>';
            }
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('board').innerHTML += table;
}

var figure = function(i,j,charCode,clickedIndex) {
    this.i = i;
    this.j = j;
    this.charCode = charCode;
}

let whiteFigure = null;
let blackFigure = null;
let emptyFigure = null;