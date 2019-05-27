import React, {Component} from 'react';
import './App.css';
import List from './Homeworks/2-23.05/List.js';

import { Button } from 'reactstrap';
import ModernDatepicker from 'react-modern-datepicker';

class App extends Component { 
    constructor(props) {
    super(props);
    this.state = {
     worksInList: [],
     work: '' ,
     priority: '',
     date: '',
   };
   this.nameChange = this.nameChange.bind(this);
   this.priorityChange = this.priorityChange.bind(this);
   this.dateChange = this.dateChange.bind(this);
   this.addWork = this.addWork.bind(this);
   this.deleteWork = this.deleteWork.bind(this);
   this.search = this.search.bind(this);
   this.sortByName = this.sortByName.bind(this);
   this.sortByPriority = this.sortByPriority.bind(this);
   this.sortByDate = this.sortByDate.bind(this);
   this.DATA = this.state.worksInList;
  }
  render () {    
    return (
      <div className="App">
        <input  placeholder="Enter the search text" onKeyUp={this.search}/>
        <List works={this.state.worksInList}
              deleteWork={this.deleteWork}
              nameChange={this.state.nameChange} 
              priorityChange={this.state.priority} 
              dateChange={this.state.dateChange}
              addWork={this.state.addWork} 
              sortByName={this.sortByName} 
              sortByPriority={this.sortByPriority}
              sortByDate={this.sortByDate}
        />
        <div>
        <h4> Enter work params </h4>
         <form>
            <input onChange={this.nameChange} value={this.state.work} placeholder="Enter new work name" required/> 
            <input onChange={this.priorityChange} value={this.state.priority} type="number" pattern="\d*" placeholder="Enter priority" required/> 
            <ModernDatepicker 
              className="datepicer"
              date={this.state.date} 
              format={'DD-MM-YYYY'} 
              showBorder        
              onChange={(date) => this.dateChange(date)}
              placeholder={'Select a date'}
            />
            <Button color="info" onClick={this.addWork}> Add</Button>{' '}
         </form>
        </div>
         
      </div>
    );
  }

  nameChange(e){ 
  	this.setState({work: e.target.value});
  } 
  priorityChange(e){ 
  	this.setState({priority: e.target.value});
  }
  dateChange(date){ 
  	this.setState({date: date});
  }

  deleteWork(i){
   this.setState({
			worksInList: this.state.worksInList.filter((item, index) => index !== i)
		});
  }

  addWork(e){
    e.preventDefault();
    if(this.state.work.length === 0 || this.state.priority.length === 0 || this.state.date.length === 0) {
  		alert('Fill all the fields correctly');
      return
    }
    const newWork = {
    	  work: this.state.work,
      	id: Date.now(),
      	priority: this.state.priority,
      	date:  this.state.date
    };
    this.setState(state => ({
     	 worksInList: state.worksInList.concat(newWork),
     	 work: '',
     	 priority: '',
       date: ''
     }));

  }
  
  search(e){
      const searchString = e.target.value;
      this.setState({
          worksInList: this.DATA
      });
      if(searchString.length > 0){
          this.setState({
              worksInList: this.state.worksInList.filter((item) => item.work.toLowerCase().match(searchString))
          });
      }

  }  
  sortByName(){
      this.setState({
          worksInList: this.state.worksInList.sort((function(a, b) { return a.work > b.work;}))
      });
  } 
  sortByPriority(){
      this.setState({
          worksInList: this.state.worksInList.sort((function(a, b) { return Number(a.priority) > Number(b.priority);}))
      });
  } 
  sortByDate(){
      this.setState({
          worksInList: this.state.worksInList.sort((function(a, b) { 
            const date1 = a.date.split("-");
            const date2 = a.date.split("-");
            return date1[2] > date2[2] || date1[1] > date2[1] || date1[0] >= date2[0];
          }))
      });
  } 

}

export default App;
