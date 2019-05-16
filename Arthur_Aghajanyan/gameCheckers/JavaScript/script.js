function start() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('playerStep').style.display = 'block';
    document.getElementById('finishMove').style.display = 'block';
    document.getElementById('chessboard').style.display = 'block';
    createForm();
}
//char code for 3 elements
let index = 1;
function playerIndex(){
    if(index % 2 === 1){
        document.getElementById('playerStep').innerHTML = 'Black player step';
    }else{
        document.getElementById('playerStep').innerHTML = 'White player step';
    }
    index++;
}
const whiteFigureCharCode = '&#9920';
const blackFigureCharCode = '&#9922';
const emptyFigureCharCode = '&#8226';

//function for creating tabla

function createForm() {
    let row = 8;
    let col = 8;
    let table = "<table class='chessTable'>";
    for (let i = 0; i < row; ++i) {
        table += '<tr>';
        for (let j = 0; j < col; ++j) {
            if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
                table += "<td onclick='clickFigure(this)' class='white' id='" + i.toString() +j.toString() + "'>";   //create id for each <td>
                if (i < 3) {
                    table += '&#9920</td>';
                } else if(i > 4){
                    table += '&#9922</td>';
                }else{
                    table += '&#8226</td>';
                }
            } else {
                table += "<td onclick='clickFigure(this)' class='silver' id='" + i.toString() + j.toString() + "'>" + '</td>';
            }
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('chessboard').innerHTML += table;
}

var Figure = function(i, j, charCode) {
    this.i = i;
    this.j = j;
    this.charCode = charCode;
}

//created seter and geter for each members

Figure.prototype.getI = function() {
    return this.i;
}
Figure.prototype.setI = function(i) {
    this.i = i;
}
Figure.prototype.getJ = function() {
    return this.j;
}
Figure.prototype.setJ = function(j) {
    this.j = j;
}
Figure.prototype.getCharCode = function() {
    return this.CharCode;
}
Figure.prototype.setCharCode = function(CharCode) {
    this.CharCode = CharCode;
}

let whiteFigure = null;
let blackFigure = null;
let emptyFigure = null;


function clickFigure(element) {

    row = element.parentNode.rowIndex;      //parentNode for use row(tr)
    col = element.cellIndex;

    let id = row + col.toString();
    //create objects at the time of the click, using <getCharCodeById> function
    switch(getCharCodeById(id)){
        case Number('9920'):
            if(index % 2 === 1){
                whiteFigure = new Figure(row,col,'9920');
            }
            break;
        case Number('9922'):
            if(index % 2 === 0){
                blackFigure = new Figure(row,col,'9922');
            }
            break;
        case Number('8226'):
            if((whiteFigure !== null) || (blackFigure !== null)){
                emptyFigure = new Figure(row,col,'8226');
            }
            break;
    }
    if((whiteFigure !== null) && (emptyFigure !== null)){
        checkStepForWhiteFigure(whiteFigure, emptyFigure);

    }else if((blackFigure !== null) && (emptyFigure !== null) ){
        checkStepForBlackFigure(blackFigure, emptyFigure);
    }
}

function getCharCodeById(id){
    return document.getElementById (id).innerText.charCodeAt();
}
//go for white figure
function drawElementWhite(obj1I, obj1J, obj2I, obj2J){
    document.getElementById(obj2I + obj2J.toString()).innerHTML = whiteFigureCharCode;
    document.getElementById(obj1I + obj1J.toString()).innerHTML = emptyFigureCharCode;
}
//go for black figure
function drawElementBlack(obj1I, obj1J, obj2I, obj2J){
    document.getElementById(obj2I + obj2J.toString()).innerHTML = blackFigureCharCode;
    document.getElementById(obj1I + obj1J.toString()).innerHTML = emptyFigureCharCode;
}

function checkStepForWhiteFigure(obj1, obj2) {
    let obj1I = obj1.getI();
    let obj1J = obj1.getJ();
    let obj2I = obj2.getI();
    let obj2J = obj2.getJ();

    //variable for forward fire
    let fireForwardI1 = obj1.getI()+1;
    let fireForwardJ1 = obj1.getJ()+1;
    let fireForwardJ2 = obj1.getJ()-1;
    //variable for back fire
    let fireWithI1 = obj1.getI()-1;
    let fireWithJ1 = obj1.getJ()-1;
    let fireWithJ2 = obj1.getJ()+1;

    //move part

    if((obj2I - obj1I) === 1 && (((obj2J - obj1J) === 1) || ((obj2J - obj1J) === -1))){
        drawElementWhite(obj1I, obj1J, obj2I, obj2J);
    }
    //forward fire
    if((obj2I - obj1I) === 2 && (obj2J - obj1J) === 2){
        let id = fireForwardI1 + fireForwardJ1.toString()
            if(getCharCodeById(id) === Number('9922')){
                drawElementWhite(obj1I, obj1J, obj2I, obj2J);
                document.getElementById(fireForwardI1 + fireForwardJ1.toString()).innerHTML = emptyFigureCharCode;
            }
    }
    if((obj2I - obj1I) === 2 && (obj2J - obj1J) === -2){
        let id = fireForwardI1 + fireForwardJ2.toString()
            if(getCharCodeById(id) === Number('9922')){
                drawElementWhite(obj1I, obj1J, obj2I, obj2J);
                document.getElementById(fireForwardI1 + fireForwardJ2.toString()).innerHTML = emptyFigureCharCode;
            }
    }
    //back fire
    if((obj1I - obj2I) === 2 && (obj1J - obj2J) === 2){
        let id = fireWithI1 + fireWithJ1.toString()
            if(getCharCodeById(id) === Number('9922')){
                drawElementWhite(obj1I, obj1J, obj2I, obj2J);
                document.getElementById(fireWithI1 + fireWithJ1.toString()).innerHTML = emptyFigureCharCode;
            }
    }
    if((obj1I - obj2I) === 2 && (obj2J - obj1J) === 2){
        let id = fireWithI1 + fireWithJ2.toString()
            if(getCharCodeById(id) === Number('9922')){
                drawElementWhite(obj1I, obj1J, obj2I, obj2J);
                document.getElementById(fireWithI1 + fireWithJ2.toString()).innerHTML = emptyFigureCharCode;
            }
    }
    whiteFigure = null;
    blackFigure = null;
    emptyFigure = null;
}

//go for black figure
function checkStepForBlackFigure(obj1, obj2) {

    let obj1I = obj1.getI();
    let obj1J = obj1.getJ();
    let obj2I = obj2.getI();
    let obj2J = obj2.getJ();
    //variables for forward fire
    let fireForwardI1 = obj1.getI()-1;
    let fireForwardJ1 = obj1.getJ()-1;
    let fireForwardJ2 = obj1.getJ()+1;
    //variables for back fire
    let fireWithI1 = obj1.getI()+1;
    let fireWithJ1 = obj1.getJ()-1;
    let fireWithJ2 = obj1.getJ()+1;
    //move part
    if((obj1I - obj2I) === 1 && (((obj1J - obj2J) === 1) || ((obj1J - obj2J) === -1))){
        drawElementBlack(obj1I,obj1J,obj2I,obj2J);
    }
    //forward fire
    if((obj1I - obj2I) === 2 && (obj1J - obj2J) === 2){
        let id = fireForwardI1 + fireForwardJ1.toString();
        if(getCharCodeById(id) === Number('9920')){
            drawElementBlack(obj1I, obj1J, obj2I, obj2J);
            document.getElementById(fireForwardI1 + fireForwardJ1.toString()).innerHTML = emptyFigureCharCode;
        }
    }
    if((obj1I - obj2I) === 2 && (obj1J - obj2J) === -2){
        let id = fireForwardI1 + fireForwardJ2.toString()
            if(getCharCodeById(id) === Number('9920')){
                drawElementBlack(obj1I, obj1J, obj2I, obj2J);
                document.getElementById(fireForwardI1 + fireForwardJ2.toString()).innerHTML = emptyFigureCharCode;
            }
    }
    //back fire
    if((obj2I - obj1I) === 2 && (obj1J - obj2J) === 2){
        let id = fireWithI1 + fireWithJ1.toString()
            if(getCharCodeById(id) === Number('9920')){
                drawElementBlack(obj1I, obj1J, obj2I, obj2J);
                document.getElementById(fireWithI1 + fireWithJ1.toString()).innerHTML = emptyFigureCharCode;
            }
    }
    if((obj2I - obj1I) === 2 && (obj2J - obj1J) === 2){
        let id = fireWithI1 + fireWithJ2.toString();
        if(getCharCodeById(id) === Number('9920')){
            drawElementBlack(obj1I, obj1J, obj2I, obj2J);
            document.getElementById(fireWithI1 + fireWithJ2.toString()).innerHTML = emptyFigureCharCode;
        }
    }
    whiteFigure = null;
    blackFigure = null;
    emptyFigure = null;
}
