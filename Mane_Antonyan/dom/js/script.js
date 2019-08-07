function setAtributes() {
    const array = document.getElementsByTagName('*');
    const count = array.length;
    for (let i = 0; i < count; ++i) {
        element.setAttribute('data-number', i); // Element number in html
        element.setAttribute('data-tag-name', dataTagName(array[i])); // Element tag name
        element.setAttribute('data-parents-count', dataParentsCount(array[i])); // Element parents count
        element.setAttribute('data-similar-tags', dataSimilarTagCounts(array[i])); // Count of tags with the same name  
    }
    console.log();
}

function dataSimilarTagCounts(element) {
    const array = document.getElementsByTagName(element.tagName);
    return array.length;
}

function dataTagName() {
    return element.tagName;
}

function dataParentsCount(element) {
    let count = 0;
    while (element.parentNode !== document) {
        element = element.parentNode;
        ++count;
    }
    return count;
}

setAtributes();