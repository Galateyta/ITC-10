import React ,{Component} from 'react';
import Modal from './Modal.js';

import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
 
class  List extends Component {

  render () {
    return (
      <Table dark>
        <thead>
          <tr>
            <th> N </th>
            <th> Work name <Button outline color="info" onClick={this.props.sortByName}>v</Button></th>
            <th> Priority <Button outline color="info" onClick={this.props.sortByPriority}>v</Button></th>
            <th> Date <Button outline color="info" onClick={this.props.sortByDate}>v</Button></th>
            <th> Modify </th>
            <th> Delete </th>
          </tr>          
        </thead>
        <tbody>    
            {this.props.works.map((item, index) => (
            <tr key={item.id}> 
              <td> {index + 1} </td>
              <td> {item.work} </td>
              <td> {item.priority} </td>
              <td> {item.date} </td>
              <Modal 
                className="modal" item={item} 
                nameChange={this.props.nameChange}
                priorityChange={this.props.priorityChange}
                dateChange={this.props.dateChange} 
                addWork={this.props.addWork}
              />
              <td> <Button color="danger"  onClick={() => this.props.deleteWork(index)} > Delete </Button>{' '} </td>
            </tr>
            ))}        
        </tbody>
      </Table>
    );
  }

}

export default List;
