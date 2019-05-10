function decimalToBinary(n) {
    n = parseInt(n);

    let arr = [];
    let steps = [];
    let old_n = n;
    let rem = 0;
    let type = '';

    if (n == 0) {
        arr.push(0);
        steps.push([`${n}/2`, n.toString(), rem.toString()]);
    } else if (n < 0) {
        n *= -1;
        type = '-';
    }

    while (n > 0) {
        old_n = n;
        if (n % 2 == 0) {
            rem = 0;
            arr.push(rem);
            n /= 2;
        } else {
            rem = 1;
            arr.push(rem);
            n = (n - 1) / 2;
        }
        steps.push([`${old_n}/2`, n.toString(), rem.toString()]);
    }

    return [type + arr.reverse().join(''), steps];
}

function createTable(steps, id, headers) {
    const rowCount = headers.length;
    const table = document.getElementById('table-' + id);
    let bits = [];

    if (table.tHead) {
        table.removeChild(table.tHead);
    } 
    const thead = table.createTHead();

    for (let i = 0; i < headers.length; i++) {
        const th = thead.appendChild(document.createElement('th'));
        th.textContent = headers[i];
    }

    if (table.tBodies.length > 0) {
        table.removeChild(table.tBodies[0]);
    }
    const tbody = table.createTBody();

    for (let i = 0; i < steps.length; i++) {
        const tr = tbody.appendChild(document.createElement('tr'));
        for (let j = 0; j < rowCount; j++) {
            let td = tr.appendChild(document.createElement('td'));

            if (j == rowCount - 1) {
                let span = td.appendChild(document.createElement('span'))
                span.textContent = steps[i][j];

                bits.push(span);
            } else {
                td.textContent = steps[i][j];
            }
        }
    }

    return bits;
}

function createResult(n, bits, id) {
    const hiddenDiv = document.getElementById('hidden-' + id);
    hiddenDiv.removeAttribute('hidden');

    const div = document.getElementById('result-' + id);
    div.focus();

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }

    if (n[0] === '-') {
        n = n.substring(1);
        createSpan('-', div, bits, 0);
    }

    for (let i = 0; i < n.length; i++) {
        (function(ind) {
            setTimeout(createSpan, 1000 + (1000 * ind), n, div, bits, i);
        })(i);
    }
}

function createSpan(n, div, bits, i) {
    let span = div.appendChild(document.createElement('span'));
    span.setAttribute('id', 'bit');
    span.textContent = n[i];

    bits[i].setAttribute('id', 'bit');
}

function convertToBinary(n) {
    const id = 'd2b';
    const tableHeaders = ['Division by 2', 'Quotient', 'Remainder'];

    let convertResult = decimalToBinary(n);
    let number = convertResult[0];
    let steps = convertResult[1];

    let bits = createTable(steps, id, tableHeaders);
    bits = bits.reverse();
    createResult(number, bits, id);
}


function onClick(id) {
    let input = document.getElementById('number-' + id);

    if (id == 'd2b') {
        convertToBinary(input.value);
        return 1;
    }

    if (input.checkValidity()) {
        if (id == 'b2h') {
            convertToHex(input.value);
        } else if (id == 'b2o') {
            convertToOctal(input.value);
        }
    } else {
        alert('Please, enter a binary number');
    }
}