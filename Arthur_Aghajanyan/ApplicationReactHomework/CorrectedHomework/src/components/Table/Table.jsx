import React, {Component} from 'react';
import './table.css';
import List from './List.jsx'
import {Button, Container, Form, FormGroup, Input, Row, Col } from 'reactstrap';

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

    render() {
        return (
          <Container className = 'my-table-style'>
              <Form onSubmit = {this.handleSubmit}>
                  <Row form>
                      <Col md={3}>
                          <FormGroup>
                              <Input type = 'text'
                                  id = 'name'
                                  placeholder = 'Enter a name'
                                  onChange = {this.handleChange}
                                  value = {this.state.name}
                                  required
                              />
                          </FormGroup>
                      </Col>
                      <Col md={3}>
                          <FormGroup>
                              <Input type = 'date'
                                  id = 'date'
                                  onChange = {this.handleChange}
                                  value = {this.state.date}
                                  required
                              />
                          </FormGroup>
                      </Col>
                      <Col md={3}>
                          <FormGroup>
                              <Input type = 'select'
                                  id = 'priority'
                                  required
                                  onChange = {this.handleChange}
                                  value = {this.state.priority}>
                                  <option></option>
                                  <option>0</option>
                                  <option>1</option>
                                  <option>2</option>
                              </Input>
                          </FormGroup>
                      </Col>
                      <Col md={3}>
                          <Button color = 'danger'>ADD</Button>
                      </Col>
                  </Row>
              </Form>
              <h2>TABLE</h2>
              <List items={this.state.items} removeItem={this.removeItem} />
          </Container>
        );
    }
}

export default MyTable;
