function myFunction() {
 let elems = document.getElementsByTagName('*');
for(let i = 0; i < elems.length; i++)
{//Add tagName
 elems[i].setAttribute("name",elems[i].tagName);
//count of tags 
console.log( elems[i].getElementsByTagName('*').length);

console.log(elems[i].children.length);

}

}

function countOfParents(elem){
let parent=elem;
let count = 0;
while(parent.tagName !=='HTML') {
parent=parentNode;
count++
}
return count
}