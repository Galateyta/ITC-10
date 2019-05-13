function validBrackets(string) {
    const chars = string.split('');
    const openBrackets = [ '(','[','{' ];
    const closeBrackets = [ ')',']','}' ];
    const stack = [];
    for (let i = 0; i < string.length; i++) {
        let openIndex = openBrackets.indexOf(chars[i]);
        if(openIndex !== -1){
            stack.push(openIndex);
        }else {
            let closeIndex = closeBrackets.indexOf(chars[i]);
            if(closeIndex !== -1){
                openIndex = stack.pop();
                if(closeIndex !== openIndex){
                return false;
                }
            }
        }
        
    }
    return (stack.length === 0);
}

function byId(id) {
    return document.getElementById(id);
}

function update(){
    const inputText = byId('text');
    const isValid = validBrackets(inputText.value);
    inputText.style.border = '20px solid ' + (isValid ? 'green' : 'red');
    inputText.style.color = (isValid ? 'green' : 'red');
}

update();
byId('text').addEventListener('keydown', update);
byId('text').addEventListener('keyup', update);
byId('text').addEventListener('change', update);