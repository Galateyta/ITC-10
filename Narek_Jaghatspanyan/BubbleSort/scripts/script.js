function main() {
    canvas = document.getElementById("canvas-1");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.15;

    let rectParams = {
        width: 30,
        heightMultiplier: 30,
        margin: 9
    };
    let swapInterval = null;
    let colorArray = ["yellow", "black", "red", "green", "blue", "orange", "aqua", "grey", "pink", "silver"];
    let rectArray = [];

    document.getElementById("shuffleArray").onclick = function () {
        rectArray = shuffle(rectArray);
        drawRectangles();
    };
    document.getElementById("bubbleSort").onclick = function () {
        document.getElementById("shuffleArray").disabled = true;
        document.getElementById("bubbleSort").disabled = true;
        bubbleSort(rectArray);

        sortInterval = setInterval(function () {
            sorted = true;
            for (i = 0; i < rectArray.length - 1; i++) {
                if (rectArray[i].x > rectArray[i + 1].x)
                    sorted = false;
            }
            if (sorted) {
                clearInterval(sortInterval);
                document.getElementById("shuffleArray").disabled = false;
                document.getElementById("bubbleSort").disabled = false;
            }
        }, 1000);

    };

    buffer = rectParams.margin * 2;
    for (i = 1; i <= 20; i++) {
        rectArray.push({
            value: i,
            width: rectParams.width,
            height: rectParams.heightMultiplier,
            x: buffer,
            y: canvas.height - rectParams.heightMultiplier,
            color: colorArray[i % colorArray.length]
        });
        buffer += rectParams.width + rectParams.margin;
    }

    function drawRectangles() {
        context.fillStyle = "white"; context.fillRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < rectArray.length; i++) {
            rect = rectArray[i];
            context.beginPath();
            context.fillStyle = rect.color;
            context.rect(rect.x, rect.y, rect.width, rect.height);
            context.fill();
            context.fillText(rect.value, rect.x + rectParams.width / 3, rect.y - rectParams.margin);
        }
    }

    function swapRectangles(rect1, rect2) {

        function swapAnimation() {
            drawRectangles();

            if (rect1.x >= x2 || rect2.x <= x1) {
                clearInterval(swapInterval);
                swapInterval = null;
            }
            else {
                rect1.x++;
                rect2.x--;
            }
        }

        if (!swapInterval) {
            x1 = rect1.x;
            x2 = rect2.x;
            swapInterval = setInterval(swapAnimation, 33);
        }
        else {
            setTimeout(swapRectangles.bind(null, rect1, rect2), 500 );
        }
    }

    function bubbleSort(a) {
        let swapped;
        do {
            swapped = false;
            for (var i = 0; i < a.length - 1; i++) {                
                if (a[i].value > a[i + 1].value) {
                    swapRectangles(a[i], a[i + 1]);
                    var temp = a[i];
                    a[i] = a[i + 1];
                    a[i + 1] = temp;

                    swapped = true;
                }
            }
        } while (swapped);
    }
    drawRectangles();
}

function shuffle(array) {
    let i = 0, j = 0, temp = null;
    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        temp = array[i].x;
        array[i].x = array[j].x;
        array[j].x = temp;
    }
    return array;
}

window.onload = main;