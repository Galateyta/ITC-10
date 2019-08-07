			
			//headr
			let divElement = document.createElement('Div');
			divElement.id = 'divID';
			divElement.style.textAlign = 'center';
			divElement.style.fontWeight = 'bold';
			divElement.style.paddingTop = '15px';
			divElement.style.margin = '10px 20px 10px 20px';
			let head = document.createElement('h1');
			let text = document.createTextNode('Insertion Sort');
			head.appendChild(text);
			divElement.appendChild(head);
			document.getElementsByTagName('body')[0].appendChild(divElement);
			head.id='hiadID';
			
			let jx = 0
			
			//change hiad color
			function change() {
			  let doc = document.getElementById('hiadID');
			  let color = ['lightblue', 'blue', 'darkblue', 'green',  'lightgreen',  'yellow', 'orange' ,'red', ];
			  doc.style.color = color[jx];
			  jx = (jx + 1) % color.length;
			}
			setInterval(change, 1000);
			
			//Add array for sorting
			const arr = [];
			const n = 7;
			for(let i = 0; i < n; i++){
				arr.push(Math.floor(Math.random()* (100) + 1));
			}
			
			//create div
			let divElement11 = document.createElement('Div');
			let divElement1 = document.createElement('Div');
			let br = document.createElement('br');
			divElement11.id = 'divArray';
			divElement1.style.textAlign = 'center';
			divElement1.style.fontWeight = 'bold';
			divElement1.style.paddingTop = '5px';			
			divElement1.appendChild(br);
			divElement.appendChild(head);
			
			//create buttons of unsorted array
			for(let k = 0; k < n; k++) {
				let button1 = document.createElement('button');
				let text = document.createTextNode(arr[k]);
				button1.style.margin = '5px 20px 5px 20px';
				button1.style.background = 'lightblue';
				button1.style.width = '5vw';
				button1.appendChild(text);
				divElement1.appendChild(button1);
				document.getElementById('divID').appendChild(divElement11);
				document.getElementById('divArray').appendChild(divElement1);
			}	
			
			//sorting array
			function insertion_Sort(arr) {
				 for (let ix = 0; ix < arr.length; ix++) {
					i=ix+1;
					let divElement22 = document.createElement('Div');
					divElement22.style.textAlign = 'center';
					divElement22.style.fontWeight = 'bold';
					let br = document.createElement('br');
					divElement22.appendChild(br);
					document.getElementById('divArray').appendChild(divElement22);					
								
					if (arr[i] < arr[0]) {					
					    						
						for(let k = 0; k < n; k++) {					
							let button2 = document.createElement('button');
							let text = document.createTextNode(arr[k]);
							button2.style.margin = '5px 20px 5px 20px';
							if(k == ix + 1) {
								button2.style.background = 'red';
							}
							else if(k <= ix) { 
								button2.style.background = 'yellow';
							}
							else {
								button2.style.background = 'lightgreen';
							}
							button2.style.width = '5vw';
							button2.appendChild(text);
							divElement22.appendChild(button2);
						}
						
						//move current element to the first position
						arr.unshift(arr.splice(i,1)[0]);
						
					} 
					else if (arr[i] > arr[i-1]) {
					
						for(let k = 0; k < n; k++) {
							let button2 = document.createElement('button');
							let text = document.createTextNode(arr[k]);
							button2.style.margin = '5px 20px 5px 20px';
							if(k === ix + 1){
								button2.style.background = 'red';
							}
							else if(k <= ix){
								button2.style.background = 'yellow';
							}
							else {
								button2.style.background = 'lightgreen';
							}
							button2.style.width = '5vw';
							button2.appendChild(text);
							divElement22.appendChild(button2);
						}
						//leave current element where it is
					    continue;
					} 
					else {
					  
						for(let k = 0; k < n; k++) {
						
							let button2 = document.createElement('button');
							let text = document.createTextNode(arr[k]);
							button2.style.margin = '5px 20px 5px 20px';
							button2.style.width = '5vw';
							button2.appendChild(text);
							divElement22.appendChild(button2);
							if(k === ix + 1){
								button2.style.background = 'red';
							}
							else if(k <= ix){
								button2.style.background = 'yellow';
							}
							else {
								button2.style.background = 'lightgreen';
							}
						}
						
						//find where element should go
					    for (let j = 1; j < i; j++) {
						
							if (arr[i] >= arr[j-1] && arr[i] <= arr[j]) {
								//move element
								arr.splice(j,0,arr.splice(i,1)[0]);
								
						    }
						}
					
					}
					
				}
			}
			insertion_Sort(arr);