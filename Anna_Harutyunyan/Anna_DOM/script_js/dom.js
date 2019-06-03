function dataParentsCount(element, count) {
    const elementParent = element.parentElement;
    if (elementParent){
        count += dataParentsCount(elementParent, count);
    }
    return count;
}
const element = document.getElementsByTagName('*');
const length = element.length;
const data_tagName = [];
for (let i = 0; i < length; i++) {
    element[i] = element[i].setAttribute('data_number', i);
    data_tagName[i] = element[i].tagName.toLowerCase();
    element[i].setAttribute('data_tagname', data_tagName[i]);
    element[i].setAttribute('data_similar',  document.getElementsByTagName(data_tagName[i]).length);  
    element[i].setAttribute('data-parents-count', dataParentsCount(element[i], 1) - 1);    
    console.log(element[i]);
}