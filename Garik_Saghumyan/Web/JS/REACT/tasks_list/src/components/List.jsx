import React, { Component } from 'react';
import {  Button, Form, FormGroup, InputGroupAddon, InputGroup, Container, Input, Table } from 'reactstrap';

class List extends Component {
    state = {
        id: "",
        task: "",
        items: []
    }

    onChange = (event) => {
        this.setState({ task: event.target.value });
    }

    onSubmit = (event)  => {    
        event.preventDefault();
        this.setState({
            task: "",
            items: [...this.state.items, this.state.task]
        }); 
    }
    onDelete = (value, event) => {
        event.preventDefault();
        const data = [...this.state.items];
        data.filter((item, index) => {
            if(index === value) {
                data.splice(index, 1);
            }
        });
        this.setState({items: [...data]}); 
    }

    render() {
        return (
            <Container>
                <Table dark>
                    {this.state.items.map((item, index) => (
                        <tr>
                            <td key={index} className="text-left">
                                {item}
                            </td>
                            <td className="text-right">
                                <Button color="danger" onClick={this.onDelete.bind(this, index)}>
                                    X
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Table>
                <Form onSubmit={this.onSubmit} className="fixed-bottom mb-10">
                    <FormGroup>
                        <InputGroup>
                            <Input type="textarea" id="taskName" placeholder="Create task" value={this.state.task} onChange={this.onChange} />
                            <InputGroupAddon addonType="append">
                                <Button color="success">SUBMIT</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}
export default List;