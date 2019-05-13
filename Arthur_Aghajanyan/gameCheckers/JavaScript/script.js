function start() {
    document.getElementById('start').style.display = 'none';
    createForm();
    
}
//char code for 3 elements

const whiteFigureCharCode = "&#9920";
const blackFigureCharCode = "&#9922";
const emptyFigureCharCode = "&#8226";

//function for creating tabla

function createForm() {
    let table = "<table class='chessTable'>";
    for (let i = 0; i < 8; ++i) {
        table += '<tr>';
        for (let j = 0; j < 8; ++j) {
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
                table += "<td onclick='clickFigure(this)' class='silver' id='" + i.toString() + j.toString() + "'>" + "</td>";
            }
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('chessboard').innerHTML += table;
}

var Figure = function(i,j,charCode,clickedIndex) {
    this.i = i;
    this.j = j;
    this.charCode = charCode;
    this.clickedIndex = clickedIndex;
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
Figure.prototype.getClickedIndex = function() {
  return this.clickedIndex;
}
Figure.prototype.setClickedIndex = function(clickedIndex) {
  this.clickedIndex = clickedIndex;
}

let whiteFigure = null;
let blackFigure = null;
let emptyFigure = null;


function clickFigure(element) {

    row = element.parentNode.rowIndex;      //parentNode for use row(tr)
    col = element.cellIndex;
    let id = row.toString() + col.toString();

//create objects at the time of the click, using <getCharCodeById> function
    if(getCharCodeById(id) == "9920"){
        let index = blackFigure === null ? 1 : 2;
        whiteFigure = new Figure(row,col,"9920",index);
  
    }else if(getCharCodeById(id) == "9922"){
        let index = whiteFigure === null ? 1 : 2;
        blackFigure = new Figure(row,col,"9922");

    }else if((getCharCodeById(id) == "8226") && ((whiteFigure !== null) || (blackFigure !== null))){
        emptyFigure = new Figure(row,col,"8226");
    }

//check to the first not to click click empti <td> , and as a result we call the corresponding function

    if(((whiteFigure !== null) && (whiteFigure.getClickedIndex() === 1)) && ((blackFigure !== null) || (emptyFigure !== null))){

        let temp = blackFigure !== null ? blackFigure : emptyFigure;
        checkStepForWhiteFigure(whiteFigure,temp);             

    }else if((blackFigure !== null) && ((whiteFigure !== null) || (emptyFigure !== null))){

        let temp = whiteFigure !== null ? whiteFigure : emptyFigure;
        checkStepForBlackFigure(blackFigure,temp);
    }
    
    
}

function getCharCodeById(id){
    return document.getElementById (id).innerText.charCodeAt();
}

//go for white figure

function checkStepForWhiteFigure(obj1,obj2) {
    
    let obj1I = obj1.getI();
    let obj1J = obj1.getJ();
    let obj2I = obj2.getI();
    let obj2J = obj2.getJ();
  
    if((obj2I - obj1I) === 1 && (((obj2J - obj1J) === 1) || ((obj2J - obj1J) === -1))){
        document.getElementById(obj2I.toString() + obj2J.toString()).innerHTML = whiteFigureCharCode;
        document.getElementById(obj1I.toString() + obj1J.toString()).innerHTML = emptyFigureCharCode;

    }
    whiteFigure = null;
    blackFigure = null;
    emptyFigure = null;
}

//go for black figure

function checkStepForBlackFigure(obj1,obj2) {
   
    let obj1I = obj1.getI();
    let obj1J = obj1.getJ();
    let obj2I = obj2.getI();
    let obj2J = obj2.getJ();
  
    if((obj1I - obj2I) === 1 && (((obj1J - obj2J) === 1) || ((obj1J - obj2J) === -1))){
        document.getElementById(obj2I.toString() + obj2J.toString()).innerHTML = blackFigureCharCode;
        document.getElementById(obj1I.toString() + obj1J.toString()).innerHTML = emptyFigureCharCode;
    }
    whiteFigure = null;
    blackFigure = null;
    emptyFigure = null;
}

