import React ,{Component} from 'react';

import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
 
class  List extends Component {
  render () {
    return (
      <Table dark>
        <thead>
          <tr>
            <th> N </th>
            <th> Work name </th>
            <th> Priority </th>
            <th> Date </th>
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
              <td> <Button color="success"> Modify </Button>{' '} </td>
              <td> <Button color="danger" onClick={this.props.deleteWork(index)}> Delete< /Button>{' '} </td>
            </tr>
            ))}        
        </tbody>
      </Table>
    );
  }
}

export default List;
