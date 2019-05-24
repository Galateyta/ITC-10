import React from 'react';
import './App.css';
import TodoList from './components/TodoList.jsx'
//import {Col} from 'reactstrap'

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  items: [],
                        text: '',
                        date: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
   
    }

    render() {
        return (
            <div className="App">
                <h3>PAGE FOR NOTES</h3>
                <TodoList items={this.state.items} removeItem={this.removeItem} />
                <form onSubmit={this.handleSubmit}>
                    <input
                        id="text"
                        onChange={this.handleChange}
                        value={this.state.text}
                        required
                        placeholder="Enter a note text"
                    />
                    <br></br>
                    <input
                        id="date"
                        onChange={this.handleChange}
                        value={this.state.date}
                        type="number"
                        required
                        placeholder="Enter a date"
                    />
                    <button className="button-class">
                        ADD
                    </button>
                </form>

            </div>
        );
    }

    handleChange(e) {
        if (e.target.id === 'text') {
            this.setState({ text: e.target.value });
        } else if (e.target.id === 'date') {
            this.setState({ date: e.target.value });
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            date: this.state.date,
            id: Date.now()
        };
        this.setState((state) => {
            state.items.push(newItem);
            return {
                text : '',
                date : ''
            }
        });
    }
    removeItem = (indexItem) => {
        this.setState(
            (state) => {
                console.log("index"+indexItem);
                const items = this.state.items;
                items.splice(indexItem, 1);
                this.setState({items})
            }
        );
    }
}


export default TodoApp;
