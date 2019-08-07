
function getParentsCount(element, count) {
    console.log(element, count);
    if (element.tagName === 'HTML') {
        return count;
    }
    const parentElement = element.parentElement;
    if (parentElement.tagName !== 'HTML') {
        count++;
        count = getParentsCount(parentElement, count);
    }
    return count;
}

const elements = document.getElementsByTagName('*');
const length = elements.length;

for (let i = 0; i < length; i++) {
    let element = elements[i];
    element.setAttribute('data-number', i);
    element.setAttribute('data-tag-name', element.tagName);
    element.setAttribute('data-similar-tags', document.getElementsByTagName(element.tagName).length);
    element.setAttribute('data-parents-count', getParentsCount(element, 1));
}
