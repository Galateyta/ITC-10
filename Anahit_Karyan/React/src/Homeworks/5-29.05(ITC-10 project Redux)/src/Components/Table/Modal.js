import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactDOM from 'react-dom';

class ModifyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}> Modify </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> Modify work params </ModalHeader>
          <ModalBody>
               <div className="fixedDiv">
                 <form >
                    <input onChange={this.props.nameChange} value= {this.props.item.work}  required/>
                    <input onChange={this.props.priorityChange} value={this.props.item.priority} pattern="\d*" required/>
                    <input
                     type="date"
                     name="date"
                     id="exampleDate"
                     placeholder="date placeholder"
                     onChange={this.props.dateChange}
                   />
                 </form>
                </div>

          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.props.addWork}> Confirmed </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModifyModal;
