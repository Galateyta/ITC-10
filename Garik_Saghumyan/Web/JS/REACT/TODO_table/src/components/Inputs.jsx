import React, { Component } from 'react';
import { Button, Form, FormGroup, InputGroup, Container, Input, InputGroupAddon } from 'reactstrap';

class Inputs extends Component {

    render() {
        const { task, priority, date, onChangeTask, onChangeDate, onChangePriority, onSubmit } = this.props;
        return (
            <Container>
                <Form onSubmit={onSubmit.bind(this)}>
                    <FormGroup>
                        <InputGroup>
                            <Input type="text" id="taskName" placeholder="Name" value={task} onChange={onChangeTask} required />
                            <Input type="date" name="date" id="exampleDate" placeholder="Date" value={date} onChange={onChangeDate} required />
                            <Input type="select" name="select" id="exampleSelect" placeholder="Priority" value={priority} onChange={onChangePriority} required>
                                <option>Priority</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </Input>
                            <Button color="success">SUBMIT</Button>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}
export default Inputs; 