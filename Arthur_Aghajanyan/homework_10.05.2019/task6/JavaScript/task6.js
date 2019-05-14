function myFunction() {
    let input, filter, ul, li, valueOfAElement, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();

    ul = document.getElementById('myUL');
    li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        valueOfAElement = li[i].getElementsByTagName('a')[0];
        txtValue = valueOfAElement.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
