function myFunction() {
    let input, filter, ul, li, valueOf_A_element, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();

    ul = document.getElementById('myUL');
    li = ul.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
        valueOf_A_element = li[i].getElementsByTagName('a')[0];
        txtValue = valueOf_A_element.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
