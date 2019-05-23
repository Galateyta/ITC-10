import React from 'react';
import { MdClose } from 'react-icons/md';

class List extends React.Component {
  state = {items: this.props.items}

  render() {
    return (
      <div id="cards">
        {this.state.items.map((item, index) => (
          <div className="card" key={item.id}>
            <div className="close-icon"><MdClose size="20px" onClick={() => this.props.removeItem(index)} /></div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default List;