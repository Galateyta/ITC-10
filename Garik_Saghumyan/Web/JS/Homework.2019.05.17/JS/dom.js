
function createAttributes() {
    const elements = this.document.getElementsByTagName('*');
    const length = elements.length;
    for (let i = 0; i < length; i++) {
        let element = elements[i];
        element.setAttribute('data-number', i);
        element.setAttribute('data-tag-name', element.tagName);
        element.setAttribute('data-similar-tags', document.getElementsByTagName(element.tagName).length);
        element.setAttribute('data-parents-count', parentsCount(element, 1) - 1);
        if(element.tagName === 'HTML'){
            element.setAttribute('data-parents-count', 0);
        }
    }
    function parentsCount(element, result) {
        let parent = element.parentElement;
        if (parent){
            result += parentsCount(parent, result);
        }
        return result;
    }
}
createAttributes();