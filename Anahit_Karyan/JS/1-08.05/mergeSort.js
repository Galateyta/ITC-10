
const sections = document.getElementsByTagName("section");
const array = prompt("Enter your array separating elements by ','").split(",");

mergeSort(array);

function mergeSort (arr) {
  if ( arr.length === 1 ) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle); 
  const right = arr.slice(middle); 
  const div = document.createElement("div");
  const tbl1 = tablePaint(left);
  const tbl2 = tablePaint(right);
  const p = document.createElement("p");
  const pText = document.createTextNode("partition result ------>");
  p.appendChild(pText);
  div.appendChild(tablePaint(arr));
  div.appendChild(p);
  div.appendChild(tbl1);
  div.appendChild(tbl2);
  sections[0].appendChild(div);
  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

function merge (left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;
  while ( indexLeft < left.length && indexRight < right.length ) {
    if ( Number(left[indexLeft]) < Number(right[indexRight])) {
      result.push(left[indexLeft]);
      indexLeft++; 
    } else {
      result.push(right[indexRight]);
      indexRight++; 
    }
  }
  result = result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  const div = document.createElement("div");
  const element1 = tablePaint(left);
  div.appendChild(element1);
  const p1 = document.createElement("p");
  const p1Text = document.createTextNode("----compared to-----");
  p1.appendChild(p1Text);
  div.appendChild(p1);
  const element2 = tablePaint(right);
  div.appendChild(element2);
  const p2 = document.createElement("p");
  const p2Text = document.createTextNode("Result of margid------>");
  p2.appendChild(p2Text);
  div.appendChild(p2);
  const tbl = tablePaint(result);   
  div.appendChild(tbl);
  sections[1].appendChild(div);
  return result;
}

function tablePaint(arr) {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  const row = document.createElement("tr");
  for ( let i = 0; i < arr.length; i++ ) {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(arr[i]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  }
  tblBody.appendChild(row);
  tbl.appendChild(tblBody);
  tbl.setAttribute("border", "2");
  return tbl;
}
