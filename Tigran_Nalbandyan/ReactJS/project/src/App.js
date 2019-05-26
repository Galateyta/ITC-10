import React, {Component} from 'react';
import './App.css';
import Table from './components/Table.jsx';
import Form from './components/Form.jsx';
import Filter from './components/Filter.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          date: '2012-12-12',
          id: Date.now(),
          priorityValue: '1',
          priorityText: 'Medium',
          n: 1,
          visible: true
        }, {
          name: 'sit amet, consectetur adipiscing elit.',
          date: '2013-02-12',
          id: Date.now() + 1,
          priorityValue: '0',
          priorityText: 'Low',
          n: 2,
          visible: true
        }
      ],
      name: '',
      date: '',
      priorityText: 'High',
      priorityValue: '2',
      sortedBy: '',
      sortDirection: 'up',
      filterValue: '',
      visible: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSort = this.onSort.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  render() {
    return (<div id="App">
      <Filter state={this.state} handleChange={this.handleChange}/>
      <Table state={this.state} removeItem={this.removeItem} onSort={this.onSort} changeItem={this.changeItem}/>
      <Form state={this.state} mode="general" handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    </div>);
  }

  handleChange(e) {
    if (e.target.id === 'name') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'date') {
      this.setState({date: e.target.value});
    } else if (e.target.id === 'priority') {
      this.setState({
        priorityValue: e.target.value.split(' ')[0],
        priorityText: e.target.value.split(' ')[1]
      });
    } else if (e.target.id === 'filter') {
      this.setState({filterValue: e.target.value});
      console.log(e.target.value)

        this.filter(e.target.value);

    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name.length) {
      return null;
    }

    const newItem = {
      name: this.state.name,
      date: this.state.date,
      priorityValue: this.state.priorityValue,
      priorityText: this.state.priorityText,
      id: Date.now(),
      n: this.state.items.length + 1
    };
    this.setState((state) => {
      state.items.push(newItem);
      return {name: '', date: '', priorityTtext: 'High', priorityValue: '2'};
    });
  }

  removeItem = (index) => {
    const newItems = this.state.items;
    delete newItems[index];
    // comment the line above and uncomment the line below if you want to fill empty N#'s
    // newItems.splice(index, 1);
    this.setState({items: newItems});
  };

  onSort(event, sortKey) {
    const items = this.state.items;
    let sortedBy = this.state.sortedBy;
    let sortDirection = this.state.sortDirection;

    if (sortedBy === sortKey) {
      if (sortDirection === 'up') {
        sortDirection = 'down';
      } else {
        sortDirection = 'up';
      }
    } else {
      sortedBy = sortKey;
      sortDirection = 'up';
    }

    items.sort((a, b) => a[sortKey].toString().localeCompare(b[sortKey.toString()]));
    if (sortDirection === 'down') {
      items.reverse();
    }

    this.setState({items: items, sortedBy: sortedBy, sortDirection: sortDirection});
  }

  changeItem(newItem, index) {
    // TODO
    const newItems = this.state.items;
    newItems[index] = newItem;
    this.setState({items: newItems});
  }

  filter = (filterValue) => {
    console.log('filter')
    const items = this.state.items;

    for (const item of items) {
      console.log(filterValue)
      if (item.name.substring(0, filterValue.length) === filterValue) {
        item.visible = true;
      } else {
        item.visible = false;
      }
    }
    this.setState({items: items});
  }
}

export default App;
