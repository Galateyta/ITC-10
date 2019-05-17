
function getParentElementCount(id) {
    let element = document.getElementById(id);
    let count = 0;
    while(element.parentNode !== document) {
        element = element.parentNode;
        count++;
    }
    return count;
}
const elements = document.getElementsByTagName('*');
const length = elements.length;

for (let i = 0; i < length; i++) {
    let element = elements[i];
    element.setAttribute('id',i);
    element.setAttribute('data-number', i);
    element.setAttribute('data-tag-name', element.tagName);
    element.setAttribute('data-similar-tags',`similar ${i}`);
    element.setAttribute('data-parents-count', getParentElementCount(i));
}


