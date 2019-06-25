import React, {Component} from 'react';
import List from './List';

import { Button } from 'reactstrap';

class TableSection extends Component {
    constructor(props) {
    super(props);
    this.state = {
     worksInList: [],
     filteredList: [],
     work: '' ,
     priority: '',
     date: '',
   };
   this.DATA = this.state.worksInList;
  }
  nameChange = (e) => {
    this.setState({work: e.target.value});
  }
  priorityChange = (e) => {
    this.setState({priority: e.target.value});
  }
  dateChange = (e) => {
    this.setState({date: e.target.value});
  }
  deleteWork = (i) => {
   this.setState({
      worksInList: this.state.worksInList.filter((item, index) => index !== i)
    });
  }

  addWork = (e) => {
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

  search = (e) => {
      console.log('changeee', e.target);
      const searchString = e.target.value;
      this.setState({
        filteredList: this.state.worksInList.filter((item) => item.work.toLowerCase().match(searchString)),
        searchText: searchString
      });

  }
  sortByName = () => {
      this.setState({
          worksInList: this.state.worksInList.sort((function(a, b) { return a.work > b.work;}))
      });
  }
  sortByPriority = () => {
      this.setState({
          worksInList: this.state.worksInList.sort((function(a, b) { return Number(a.priority) > Number(b.priority);}))
      });
  }
  sortByDate = () => {
      this.setState({
          worksInList: this.state.worksInList.sort((function(a, b) {
            const date1 = a.date.split("-");
            const date2 = a.date.split("-");
            return date1[2] > date2[2] || date1[1] > date2[1] || date1[0] >= date2[0];
          }))
      });
  }
  render () {
  	const list = this.state.searchText ? this.state.filteredList : this.state.worksInList;

    return (
      <div>
        <input  placeholder="Enter the search text" value={this.state.searchText} onChange={this.search}/>
        <List works={list}
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
            <input
             type="date"
             name="date"
             id="exampleDate"
             placeholder="date placeholder"
             onChange={this.dateChange}
           />
            <Button color="info" onClick={this.addWork}> Add</Button>{' '}
         </form>
        </div>

      </div>
    );
  }
}

export default TableSection;
