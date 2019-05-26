import React, {Component} from 'react';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import {MdEdit} from 'react-icons/md';
import Form from './Form.jsx';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: this.props.item.name,
      date: this.props.item.date,
      priorityText: this.props.item.priorityText,
      priorityValue: this.props.item.priorityValue,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (<div>
      <MdEdit size="20px" onClick={this.toggle}/>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
        <MDBModalHeader toggle={this.toggle}>Edit: {this.props.item.name}</MDBModalHeader>
        <MDBModalBody>
          <Form state={this.state} mode="secondary" handleChange={this.handleChange} handleSubmit={() => {}}/>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={this.onSave}>Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </div>);
  }

  handleChange = (e) => {
    if (e.target.id === 'name') {
      this.setState({name: e.target.value});
    } else if (e.target.id === 'date') {
      this.setState({date: e.target.value});
    } else if (e.target.id === 'priority') {
      this.setState({
        priorityValue: e.target.value.split(' ')[0],
        priorityText: e.target.value.split(' ')[1]
      });
    }
  }

  onSave = () => {
    const newItem = {
      name: this.state.name,
      date: this.state.date,
      priorityText: this.state.priorityText,
      priorityValue: this.state.priorityValue,
      id: this.props.item.id,
      n: this.props.item.n,
      visible: this.props.item.visible,
    }
    this.props.changeItem(newItem, this.props.index)
    this.toggle();
  }
}

export default Modal;
