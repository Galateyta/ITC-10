import React from "react";
import {
  Button,
  Input,
  Select,
  Row,
  InputGroup,
  InputGroupAddon,
  Col
} from "reactstrap";

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Row>
          <InputGroup>
            <Col>
              <Input
                id="name"
                onChange={this.props.handleChange}
                value={this.props.state.name}
                placeholder="Name"
                required
              />
            </Col>
            <Col>
              <Input
                id="date"
                onChange={this.props.handleChange}
                value={this.props.state.date}
                placeholder="Date"
                type="date"
                required
              />
            </Col>
            <Col>
              <Input
                id="priority"
                onChange={this.props.handleChange}
                value={`${this.props.state.priority.value} ${this.props.state.priority.text}`}
                placeholder="Priority"
                type="select"
                required
              >
                <option value="2 High">High</option>
                <option value="1 Medium">Medium</option>
                <option value="0 Low">Low</option>
              </Input>
            </Col>
            <InputGroupAddon addonType="append">
              <Button color="primary">Add</Button>
            </InputGroupAddon>
          </InputGroup>
        </Row>
      </form>
    );
  }
}

export default Form;
