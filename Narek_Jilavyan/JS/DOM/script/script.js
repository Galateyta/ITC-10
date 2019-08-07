function parentsCount(element) {
	let parent = element;
	let count = 0;
	while(parent.tagName !== "HTML") {
    	parent = parent.parentNode;
        count++;
    }
    return count;
}

function createAttributes() {
    const elements = this.document.getElementsByTagName('*');
    const length = elements.length;
    for (let i = 0; i < length; i++) {
        let element = elements[i];
        element.setAttribute('data-number', i);
        element.setAttribute('data-tag-name', element.tagName);
        element.setAttribute('data-similar-tags', document.getElementsByTagName(element.tagName).length);
        element.setAttribute('data-parents-count', parentsCount(element));
        if(element.tagName === 'HTML'){
            element.setAttribute('data-parents-count', 0);
        }
    }
}

createAttributes(); 