import React from 'react';
import './App.css';
import List from './components/List.jsx';
import Form from './components/Form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [{
      name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2012-12-12',
      id: Date.now(),
      priority: {value: '1', text: 'Medium'}
    }], name: '', date: '', priority: {text: 'High', value: '2'}};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div id="App">
        <List items={this.state.items} removeItem={this.removeItem} />
        <Form state={this.state} handleChange={this.handleChange}  handleSubmit={this.handleSubmit} />
      </div>
    );
  }

  handleChange(e) {
    if (e.target.id === 'name') {
      this.setState({ name: e.target.value });
    } else if (e.target.id === 'date') {
      this.setState({ date: e.target.value });
    } else if (e.target.id === 'priority') {
      this.setState({ priority: {value: e.target.value.split(' ')[0], text: e.target.value.split(' ')[1]} });
      console.log(this.state.priority);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name.length) {
      return;
    }
    const newItem = {
      name: this.state.name,
      date: this.state.date,
      priority: this.state.priority,
      id: Date.now()
    };
    this.setState((state) => {
      state.items.push(newItem);
      return {
        name : '',
        date : '',
        priority: {text: 'High', value: '2'},
        }
      });
  }

  removeItem = (index) => {
    const newItems = this.state.items;
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  }
}

export default App;
