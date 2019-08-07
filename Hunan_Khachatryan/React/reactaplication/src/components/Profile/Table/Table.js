import React, {Component} from 'react';
import style from './Table.module.css';
import List from './List'
import {Button, Form, FormGroup, Input } from 'reactstrap';

class MyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  items: [],
                        name: '',
                        date: '',
                        priority: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    render() {
        return (
          <div>
              <Form onSubmit = {this.handleSubmit}>
                  <tr >
                      <td>
                          <FormGroup>
                              <Input type = 'text'
                                  id = 'name'
                                  className={style.input}
                                  placeholder = 'Enter a name'
                                  onChange = {this.handleChange}
                                  value = {this.state.name}
                                  required
                              />
                          </FormGroup>
                      </td>
                      <td >
                          <FormGroup>
                              <Input type = 'date'
                                  id = 'date'
                                  className={style.input}
                                  onChange = {this.handleChange}
                                  value = {this.state.date}
                                  required
                              />
                          </FormGroup>
                      </td>
                      <td md={3}>
                          <FormGroup>
                              <Input type = 'select'
                                  id = 'priority'
                                  className={style.input}
                                  required
                                  onChange = {this.handleChange}
                                  value = {this.state.priority}>
                                  <option></option>
                                  <option>Low</option>
                                  <option>Medium</option>
                                  <option>Higth</option>
                              </Input>
                          </FormGroup>
                      </td>
                      <td >
                          <Button color = 'primary'>ADD</Button>
                      </td>
                  </tr>
              </Form>
              <h2>TABLE</h2>
              <List items={this.state.items} removeItem={this.removeItem} />
              </div>
        );
    }


    handleChange(e) {
        if (e.target.id === 'name') {
            this.setState({ name: e.target.value });
        } else if (e.target.id === 'date') {
            this.setState({ date: e.target.value });
        } else if (e.target.id === 'priority') {
            this.setState({ priority: e.target.value });
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
                priority: ''
            }
        });
    }

    removeItem = (indexItem) => {
        const items = this.state.items;
        items.splice(indexItem, 1);
        this.setState({items});
    }
}

export default MyTable;