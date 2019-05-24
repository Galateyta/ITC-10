import React from 'react';
import { MdClose } from 'react-icons/md';

class List extends React.Component {
  render() {
    return (
      <div id="cards">
        <table border="1">
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Priority</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.items.map((item, index) => (
              <tr key={item.id}>
                <td>
                  {index+1}
                </td>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.priority.text}
                </td>
                <td>
                  {item.date}
                </td>
                <td>
                  <div className="close-icon">
                    <MdClose
                      size="20px"
                      onClick={() => this.props.removeItem(index)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default List;
