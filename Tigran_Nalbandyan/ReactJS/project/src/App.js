import React from 'react';
import './App.css';
import List from './components/List.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [{title: 'To Do #1',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dictum scelerisque ultricies. Nulla interdum suscipit nisl ut molestie. Donec feugiat mattis orci nec molestie. Sed accumsan lacus vitae maximus pretium. Morbi feugiat, ipsum in lacinia fermentum, libero tellus congue massa, id mollis libero massa sit amet diam. Cras sollicitudin scelerisque ante sed feugiat. Pellentesque sed libero lacus. Vivamus vel elementum metus. Sed ullamcorper quam vel tortor tempus suscipit et in massa. Aenean finibus rhoncus lacus vitae vestibulum.',
                            date: '12.12.2012',
                            id: Date.now(),
                          }], title: '', description: '', date: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div id="App">
        <List items={this.state.items} removeItem={this.removeItem} />
        <form onSubmit={this.handleSubmit}>
          <input
            id="title"
            onChange={this.handleChange}
            value={this.state.title}
            required
          />
          <input
            id="description"
            onChange={this.handleChange}
            value={this.state.description}
            required
          />
          <input
            id="date"
            onChange={this.handleChange}
            value={this.state.date}
            type="number"
            min="1"
            required
          />
          <button>
            Add
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    if (e.target.id === 'title') {
      this.setState({ title: e.target.value });
    } else if (e.target.id === 'description') {
      this.setState({ description: e.target.value });
     } else if (e.target.id === 'date') {
      this.setState({ date: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.title.length) {
      return;
    }
    const newItem = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      id: Date.now()
    };
    console.log(this.state.items);
    this.setState((state) => {
      state.items.push(newItem);
      return {
        title : '',
        description : '',
        date : ''
        }
      });
    console.log(this.state.items);
  }

  removeItem = (index) => {
    const newItems = this.state.items;
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  }
}

export default App;
