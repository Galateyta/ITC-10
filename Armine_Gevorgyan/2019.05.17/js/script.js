const elements = document.getElementsByTagName('*');
const elementsCount = elements.length;

for (let i = 0; i < elementsCount; ++i) {

	const element = elements[i];
	element.setAttribute('Data-number', i);
    element.setAttribute('Data-tagName', element.tagName);
	element.setAttribute('Data-parents-count', parentsCount(element));
    element.setAttribute('Data-newData', document.getElementsByTagName(element.tagName).length);
		
}


function parentsCount(element) {
	
	if (element.tagName === 'HTML') {
        return 0;
    }
	
	let parentsCount = 0;	
    let parentElement = element.parentElement;
	
	while(parentElement.tagName !== 'HTML') {
		parentElement = parentElement.parentElement;
		++parentsCount;
	}
    
    return parentsCount;
	
}

