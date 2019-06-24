function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
        tbl.style.whidth = '500px';
        tbl.style.border = '1px solid black';

    for(var i = 0; i < 5; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 6; j++){
        if((i + j) % 2 == 0){
                var td = tr.insertCell();
                td.appendChild(document.createTextNode(' '));
                td.style.border = '1px solid black';
                td.style.width = '50px';
			    td.style.height = '50px';
			    td.style.backgroundColor = 'yellow';
           }
           else{
            var td = tr.insertCell();
                td.appendChild(document.createTextNode(' '));
                td.style.border = '1px solid black';
                td.style.width = '50px';
			    td.style.height = '50px';
			 td.style.backgroundColor = 'grey';
           }
     }  
    }
    body.appendChild(tbl);
}
tableCreate();
