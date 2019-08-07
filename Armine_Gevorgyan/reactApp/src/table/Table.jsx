import React, {Component} from 'react';
import {Item} from './tableComponents/Item'
import {Input} from './tableComponents/Input'
import {Modal} from './tableComponents/Modal';
import './App.css';

class Table extends Component {
  state = {
    list: [
      {
        name: 'test',
        prioritet: '1',
        startDate: '2019-02-01',
        visibility: 'visible',
      },
    ],
    flagName: true,
    flagDate: true,
    flagPrioritet: true,
    show: true,
    changeIndex: '',
    copyList : '',
    copyIndex : '',
    currentPage : '',
    pageNumber:''
  }

  constructor () {
  super();
  this.currentPage = 0;
  this.pageNumber = Math.floor(this.state.list.length/3 + 1);
  }

  updateList = (item) => (e) => {
    e.preventDefault();
    const list = this.state.list;
    list.push(item);
    this.setState({list});
  }

  changeList = (item) => (e) =>  {
	e.preventDefault();
  	const index = this.changeIndex;
    const list = this.state.list;
    list[index].name = item.name;
    list[index].prioritet=item.prioritet;
    list[index].startDate=item.startDate;
    this.setState({list});
  }

  removeList = (index) => () => {
    const tasks = this.state.list
    tasks.splice(index, 1)
    this.setState({tasks})
  }


  sortListName = () => {
    let flagName = this.state.flagName;
    let tasks = this.state.list;
    const size = this.state.list.length;
    for(let i = 0; i < size - 1; ++i) {
      for(let j = i + 1; j < size ; ++j) {
        if(flagName) {
          if(tasks[i].name > tasks[j].name) {
            const tmp = tasks[i];
            tasks[i] = tasks[j];
            tasks[j] = tmp;
          }
        } else {
          if(tasks[i].name < tasks[j].name) {
            const tmp = tasks[i];
            tasks[i] = tasks[j];
            tasks[j] = tmp;
          }
        }
      }
    }

    this.state.flagName = !this.state.flagName;
    this.setState({tasks});
  }

  sortListPrioritet = () => {
    let tasks = this.state.list;
    const size = this.state.list.length;
    for(let i = 0; i < size - 1; ++i) {
      for(let j = i+1; j < size ; ++j) {
        if(this.state.flagPrioritet){
          if(tasks[i].prioritet > tasks[j].prioritet) {
            const tmp = tasks[i];
            tasks[i] = tasks[j];
            tasks[j] = tmp;
          }
        } else {
          if(tasks[i].prioritet < tasks[j].prioritet){
            const tmp = tasks[i];
            tasks[i] = tasks[j];
            tasks[j] = tmp;
          }
        }
      }
    }

    this.state.flagPrioritet = !this.state.flagPrioritet;
    this.setState({tasks});
  }

  sortListDate = () => {
    let tasks = this.state.list;
    const size = this.state.list.length;
    for(let i = 0; i < size - 1; ++i) {
      for(let j = i+1; j < size ; ++j) {
        const year1 = this.state.list[i].startDate.slice(0,10);
        const year2 = this.state.list[j].startDate.slice(0,10);
        if(this.state.flagDate) {
          if(year1 > year2) {
            const tmp = tasks[i];
            tasks[i] = tasks[j];
            tasks[j] = tmp;
          }
        } else {
            if(year1 < year2) {
            const tmp = tasks[i];
            tasks[i] = tasks[j];
            tasks[j] = tmp;
          }
        }
      }
    }

    this.state.flagDate = !this.state.flagDate;
    this.setState({tasks});
  }

  showModal = (index) =>  ()=>{
  	this.changeIndex = index;
    this.setState ({
    ...this.state,
    show: !this.state.show
    });
  }

  copy = () => {
	if(this.copyIndex == 1) {
  		this.copyList = this.state.list;
	}
  }

  handleChange = (e) => {
	if(this.copyIndex > 1 ) {
		this.copyIndex = this.copyIndex + 1;
	} else if(this.copyIndex === 1){
		this.copyIndex = this.copyIndex + 1;
	} else {
	 	this.copyIndex =  1;
	}

 	this.copy(this.copyIndex);
 	const text = e.target.value;
 	const size = text.length;
    let currentList = [];
    let newList = [];
    if (text!== "") {
    	this.state.list.map((item,index) => {
    		const val = item.name.slice(0,size);
    		if(val == text ) {
    			newList.push(item);
    		}
    	});
    }

    if(newList.length === 0 && text !== "") {
    	currentList = [];
	   	this.state.list = currentList;
	   	this.setState({currentList});
	} else if(newList.length !== 0 && text !== "") {
	   	this.state.list = newList;
	   	this.setState({newList});
	}else if(text === ""){
	    const arr = this.copyList;
	    this.state.list = this.copyList;
	    this.setState({arr});this.copyIndex = -1;
	}
  }
  	drow = (index) => {
  	let newList = [];
  	let i = this.currentPage;
  	this.pageNumber = Math.floor(this.state.list.length/2 + 1);
  	this.state.list = this.copyList;
  			if(this.currentPage === 0 ) {

  				this.currentPage++;
  				newList = this.state.list.slice(i*2,2);
	   			this.state.list = newList;
	   			this.setState({newList});
	   		} else {
	   			if(index === 1) {
	   			if(this.currentPage !== 0) {
	   				this.currentPage--;
	   				newList = this.state.list.slice(i*2,2);
	   				this.state.list = newList;
	   				this.setState({newList}) }
	   			} else if (index === 2) {
	   			if(this.currentPage < this.pageNumber){
	   				this.currentPage++;
	   				newList = this.state.list.slice(i*2,2);
	   				this.state.list = newList;
	   				this.setState({newList})
	   				}
	   			}

	   		}
  	}


  renderItem = () => {
    return this.state.list.map((item,index) => {
      return <Item count={index} name={item.name} prioritet={item.prioritet} startDate={item.startDate} 							  			onClick={this.removeList} showModal={this.showModal}
      		 />
    })
  }


  render () {
    return (
      <div className="App" id="appId"><div>
        <div className="start">
          <Input onSubmit={this.updateList}  />
        </div>
        <div >
      	  <input onChange={this.handleChange} type="text" id="myInput"  placeholder="Search for names.." title="Type in a name"/>
      	</div>
        <div className="tableDiv">
          <table Classname="myTables">
            <tr>
              <th id="index">Id</th>
              <th id="th"> Name
              	<button id="myButton" onClick={this.sortListName}> sort </button>
              </th>
              <th id="th"> Prioritet
              	<button id="myButton" onClick={this.sortListPrioritet}> sort </button>
              </th>
              <th id="th"> Date
              	<button id="myButton" onClick={this.sortListDate}> sort </button>
              </th>
              <th id="edit"></th>

              <Modal  onClose={this.showModal()}  changeList={this.props.changeList} show={this.state.show}> Edit
			    <Input onSubmit={this.changeList}/>
			  </Modal>

            </tr>
          </table>
          {this.renderItem()}


        </div>
      </div></div>

    );
  }
}

export {Table};
