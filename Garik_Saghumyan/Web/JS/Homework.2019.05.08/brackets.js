function validBrackets(string) {
    let chars = string.split('');
    let openBrackets = [ '(','[','{' ];
    let closeBrackets = [ ')',']','}' ];
    let stack = [];
    for (let i = 0; i < string.length; i++) {
        let openIndex = openBrackets.indexOf(chars[i]);
        if(openIndex !== -1){
        stack.push(openIndex);
        continue;
        }
        let closeIndex = closeBrackets.indexOf(chars[i]);
        if(closeIndex !== -1){
            openIndex = stack.pop();
            if(closeIndex !== openIndex){
            return false;
            }
        }
    }
    return (stack.length === 0);
}

function byId(id) {
    return document.getElementById(id);
}

function update(){
    let inputText = byId('input');
    let isValid = validBrackets(inputText.value);
    inputText.style.border = '20px solid ' + (isValid ? 'green' : 'red');
    inputText.style.color = (isValid ? 'green' : 'red');
}

update();
byId('input').addEventListener('keydown', update);
byId('input').addEventListener('keyup', update);
byId('input').addEventListener('change', update);