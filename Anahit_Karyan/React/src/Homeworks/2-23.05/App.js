

import React, {Component} from 'react';
import './App.css';
import List from './List.js';

class App extends Component { 
    constructor(props) {
    super(props);
    this.state = {
     worksInList: [],
     work: '' 
   };
   this.inputChange = this.inputChange.bind(this);
   this.addWork = this.addWork.bind(this);
   this.deleteWork = this.deleteWork.bind(this);
  }
  render () {    
    return (
      <div className="App">
        <List works={this.state.worksInList} deleteWork={this.deleteWork}/>
        <div className="fixedDiv">
         <form className="fixedForm">
            <input onChange={this.inputChange} value={this.state.work} placeholder="Enter new job"/> 
            <button onClick={this.addWork}> Add </button>
         </form>
        </div>
      </div>
    );
  }

  inputChange(e){ 
  this.setState({ work: e.target.value});
  } 

  addWork(e){
     e.preventDefault();
    if(this.state.work.length === 0) {
      return
    }
    const newWork = {
      work: this.state.work,
      id: Date.now()
    };
    this.setState(state => ({
      worksInList: state.worksInList.concat(newWork),
      work: ''
     }));

  }

   deleteWork(index){
     this.setState(
        (state) => {   
           {worksInList:  this.state.worksInList.splice(index, 1);}
        }
    );
  }
}

export default App;