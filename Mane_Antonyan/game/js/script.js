function start() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('changePlayer').style.display = 'block';
    document.getElementById('00').style.display = 'block';

    document.getElementById('step').style.display = 'block';
    document.getElementById('step').style.color = 'White';
    document.getElementById('step').style.fontSize = 'large';
    document.getElementById('step').style.margin = '10px 10px 20px 30px';
    document.getElementById('step').innerHTML = 'White player step';

    startGame();
    console.log("start game!");
}

function createFigure(i, j, player) {
    console.log("figure!");
    let element = document.getElementById(i.toString + j);
    let div = document.createElement('div');
    if (player.color === 'black') {
        div.className = "blackCircle circle";
    } else {
        div.className = "whiteCircle circle";
    }

    element = document.getElementById(i.toString() + j);
    document.element.appendChild(div);
}1

function change() {
    if (document.getElementById('step').innerHTML == 'White player step') {
        document.getElementById('step').innerHTML = 'Black player step';
    } else {
        document.getElementById('step').innerHTML = 'White player step';
    }
}

const player1 = {name: 'Player1', count: 12, color: 'white', status: 'true'};
const player2 = {name: 'Player2', count: 12, color: 'black', status: 'false'};

function startGame() {
    const row = 8;
    const column = 4;
    for (let i = 1; i <= row; ++i) {
        for (let j = 1; j <= column; ++j) {
            if (i < 4) {
                createFigure(i, j, player2);
            } else if (i > 5) {
                createFigure(i, j, player1);
            }
        }
    }
}

function enter(i, j) {
    }