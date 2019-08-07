import React, { Component } from 'react';
import {
  Button,
  Input,
  Row,
  InputGroup,
  InputGroupAddon,
  Col
} from 'reactstrap';

class Form extends Component {
  render() {
    return (<div className={this.props.mode === 'general' ? 'form' : 'pr-3'}>
      <form onSubmit={this.props.handleSubmit}>
        <Row>
          <InputGroup>
            <Col className={this.props.mode === 'general' ? 'col-5' : 'col-6'}>
              <Input id="name" onChange={this.props.handleChange} value={this.props.state.name} placeholder="Name" required="required"/>
            </Col>
            <Col className="col-3">
              <Input id="date" onChange={this.props.handleChange} value={this.props.state.date} placeholder="Date" type="date" required="required"/>
            </Col>
            <Col className="col-2">
              <Input id="priority" onChange={this.props.handleChange} value={`${this.props.state.priorityValue} ${this.props.state.priorityText}`} placeholder="Priority" type="select" required="required">
                <option value="2 High">High</option>
                <option value="1 Medium">Medium</option>
                <option value="0 Low">Low</option>
              </Input>
            </Col>
            {this.props.mode === 'general' ? <Col className="col-1">
              <InputGroupAddon addonType="append">
                <Button color="primary">Add</Button>
              </InputGroupAddon>
            </Col> : ''}
          </InputGroup>
        </Row>
      </form>
    </div>);
  }
}

export default Form;
