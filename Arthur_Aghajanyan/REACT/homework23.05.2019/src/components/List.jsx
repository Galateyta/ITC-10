import React from 'react';
import {  Button, Container, Table , Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

class List extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    items: this.props.items,
    modal: false,
    name: '',
    date: '',
    priority: ''
  }
  this.compareBy.bind(this);
  this.sortBy.bind(this);
  this.toggle = this.toggle.bind(this);
  this.handleChange = this.handleChange.bind(this);
}

toggle() {
  this.setState(prevState => ({
    modal: !prevState.modal
  }));
}

saveItem(index) {
  this.setState((state) => {
      state.items[index].name = this.state.name;;
      state.items[index].date = this.state.date;;
      state.items[index].priority = this.state.priority;;

  });

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
}

  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] >= b[key]) return 1;
    };
  }

  sortBy(key) {
    this.state.items.sort(this.compareBy(key));
    this.setState({...this.state.items});
  }

  handleChange(e, item) {
      if (e.target.id === 'name') {
          this.setState({ name: e.target.value });
      } else if (e.target.id === 'date') {
          this.setState({ date: e.target.value });
      } else if (e.target.id === 'priority') {
          this.setState({ priority: e.target.value });
      }
  }

    render() {
        return (
          <Container>
                <Table bordered>
                <thead>
                  <tr>
                    <th>INDEX</th>
                    <th onClick={() => this.sortBy('name')}>NAME</th>
                    <th onClick={() => this.sortBy('date')}>DATE</th>
                    <th onClick={() => this.sortBy('priority')}>PRIORITY</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.items.map((item, index) => (
                          <tr key = {index}>
                            <td>
                              {index+1}
                            </td>
                            <td className="text-left">
                                name : {item.name}
                            </td>
                            <td className="text-left">
                                date : {item.date}
                            </td>
                            <td className="text-left">
                                priority : {item.priority}
                                <Button close onClick={() => this.props.removeItem(index)}/>

                                <Button color="info" onClick={this.toggle}>EDIT</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                                        <ModalBody>
                                            <Input id="name" type="text" value = {this.state.name} onChange = {this.handleChange}/>
                                            <Input id="date" type="date" value = {this.state.date} onChange = {this.handleChange}/>
                                            <Input id="priority" type = "select" value = {this.state.priority} onChange = {this.handleChange}>
                                                <option></option>
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </Input>
                                    </ModalBody>
                                  <ModalFooter>
                                      <Button color="primary" onClick={this.saveItem.bind(this,index)}>Save</Button>
                                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                  </ModalFooter>
                                </Modal>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Container>

              );
    }
}
export default List;
