import React, { Component } from 'react';
import Inputs from './tablecomponents/Inputs';
import Tables from './tablecomponents/Tables';
import Filter from './tablecomponents/Filter';
import { Col, Container, Row } from 'reactstrap';

class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 1,
      task: "",
      priority: "",
      date: "",
      filterText: "",
      show: false,
      items: []
    }
  }
  onChangeFilter = (event) => {
    this.setState({
      filterText: event.target.value
    });
  }
  onChangeTask = (event) => {
    this.setState({
      task: event.target.value
    });
  }
  onChangePriority = (event) => {
    this.setState({
      priority: event.target.value
    });
  }
  onChangeDate = (event) => {
    this.setState({
      date: event.target.value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    let prioritet = this.state.priority;
    switch (prioritet) {
      case 'High':
        prioritet = '1';
        break;
      case 'Medium':
        prioritet = '2';
        break;
      case 'Low':
        prioritet = '3';
        break;
    }
    const newItem = {
      id: this.state.id,
      task: this.state.task,
      date: this.state.date,
      filterText: this.state.filterText,
      priority: prioritet
    }
    const updateItems = [...this.state.items, newItem];
    this.setState({
      items: updateItems,
      task: "",
      date: "",
      priority: "",
      filterText: "",
      id: this.state.id + 1
    });

  }
  onDelete = (value, event) => {
    event.preventDefault();
    const data = [...this.state.items];
    data.filter((item, index) => {
      if (index === value) {
        data.splice(index, 1);
      }
    });
    this.setState({ items: [...data] });
  }
  handleClose = () => {
    this.setState({
      show: false
    });
  }
  handleShow = (id) => {
    const data = [...this.state.items]
    const filtereditems = data.filter((item) => item.id !== id);
    const selecteditem = data.find((item) => item.id === id);
    this.setState({
      show: true,
      items: filtereditems,
      task: selecteditem.task,
      date: selecteditem.date,
      priority: selecteditem.priority,
      id: id
    });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">TASKS TABLE</h1>
            <Inputs task={this.state.task} priority={this.state.priority} date={this.state.date} onChangeTask={this.onChangeTask} onChangeDate={this.onChangeDate}
              onChangePriority={this.onChangePriority} onSubmit={this.onSubmit} />
            <Filter onChangeFilter={this.onChangeFilter} />
            <Tables items={this.state.items} onDelete={this.onDelete} onSubmit={this.onSubmit} filterText={this.state.filterText} show={this.state.show} handleShow={this.handleShow} handleClose={this.handleClose}
              onChangeTask={this.onChangeTask} onChangeDate={this.onChangeDate}
              onChangePriority={this.onChangePriority} />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Table;