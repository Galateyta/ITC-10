function searching() {

  let input = document.getElementById('input').value;
  let div = document.getElementById("div");
  let p = div.getElementsByTagName('P');
  let txtValue;

  for (i = 0; i < p.length; i++) {
    txtValue = p[i].innerText;
    if (txtValue.indexOf(input) != 0) {
      p[i].style.display = "none";
    }
  }


}
