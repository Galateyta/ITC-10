function search(value) {
    const names = [  
        'Artur', 
        'Anna', 
        'Anahit', 
        'Armine', 
        'Narek', 
        'Garik', 
        'Tigran', 
        'Mane', 
        'Hunan',  
        ]; 
    document.getElementById('result').innerHTML = ''; 
    for (let i = 0; i < names.length; i++) { 
        if(((names[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) { 
            const p = document.createElement('p'); 
            const text = document.createTextNode(names[i]); 
            p.appendChild(text); 
            document.getElementById('result').appendChild(p).setAttribute('class', 'h3'); 
        } 
    }
}