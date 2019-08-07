

import React, {Component} from 'react';
import './App.css';
import List from './Homeworks/2-23.05/List.js';

class App extends Component { 
    constructor(props) {
    super(props);
    this.state = {
     worksInList: [],
     work: '' ,
     priority: '',
     date: ''
   };
   this.inputChange1 = this.inputChange1.bind(this);
   this.inputChange2 = this.inputChange2.bind(this);
   this.inputChange3 = this.inputChange3.bind(this);
   this.addWork = this.addWork.bind(this);
   this.deleteWork = this.deleteWork.bind(this);
   
  }
  render () {    
    return (
      <div className="App">
        <List works={this.state.worksInList} deleteWork={this.deleteWork}/>
        <div className="fixedDiv">
         <form className="fixedForm">
            <input onChange={this.inputChange1} deleteWork={this.deleteWork} value={this.state.work} placeholder="Enter new job"/> 
            <input onChange={this.inputChange2} value={this.state.priority} placeholder="Enter priority"/>
            <input onChange={this.inputChange3} value={this.state.date} placeholder="Date"/>
            <button onClick={this.addWork}> Add </button>
         </form>
        </div>
      </div>
    );
  }

  inputChange1(e){ 
  this.setState({ work: e.target.value});
  } 
  inputChange2(e){ 
  this.setState({ priority: e.target.value});
  }
  inputChange3(e){ 
  this.setState({ date: e.target.value});
  }

   deleteWork(index){
     this.setState(
        (state) => {   
           {worksInList:  this.state.worksInList.splice(index, 1);}
        }
    );
  }

  addWork(e){
     e.preventDefault();
    if(this.state.work.length === 0) {
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

}

export default App;
