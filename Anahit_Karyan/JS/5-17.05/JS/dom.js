const all = document.getElementsByTagName('*');
for (let i = 0; i < all.length; ++i) { 
	//1.add atribut data_number
	all[i].setAttribute('data_number', i);
	//2.add atribut data_ntagName
	all[i].setAttribute('data_tagName', all[i].tagName);
	//3.add atribut data_simularTeg
	const simularTag = [];
	for (let j = 0; j < all.length; ++j) { 
		if (all[i].tagName === all[j].tagName) {
			simularTag.push(all[i].tagName);
		}
	}
	all[i].setAttribute('data_simular_tagCount', simularTag.length - 1); 
	//4.add atribut data_parenCount
	let parent =  all[i].parentElement;  
	let caunt = 0;
	while(parent) {
		caunt++;
	    parent = parent.parentElement;
	}
	all[i].setAttribute('data_parenCount', caunt);
}
console.log(all);