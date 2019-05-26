import React, { Component } from 'react';
import { MdClose } from 'react-icons/md';
import Modal from './Modal.jsx';

class Table extends Component {
  render() {
    return (<div id="cards">
      <table border="1" className="sortable">
        <thead>
          <tr>
            <TableHead id='id' text='№' onSort={this.props.onSort} state={this.props.state} />
            <TableHead id='name' text='Name' onSort={this.props.onSort} state={this.props.state} />
            <TableHead id='priorityValue' text='Priority' onSort={this.props.onSort} state={this.props.state} />
            <TableHead id='date' text='Date' onSort={this.props.onSort} state={this.props.state} />
          </tr>
        </thead>
        <tbody>
          {
            this.props.state.items.map((item, index) => item.visible ? (<tr key={item.id}>
              <td>
                {item.n}
              </td>
              <td>
                {item.name}
              </td>
              <td>
                {item.priorityText}
              </td>
              <td>
                {item.date}
              </td>
              <td>
                <div className="close-icon">
                  <MdClose size="20px" onClick={() => this.props.removeItem(index)}/>
                  <Modal item={item} index={index} changeItem={this.props.changeItem} />
                </div>
              </td>
            </tr>) : <tr key={item.id}></tr>)
          }
        </tbody>
      </table>
    </div>);
  }
}

class TableHead extends React.Component {
  render() {
    return (<th onClick={e => this.props.onSort(e, this.props.id)}>{this.props.text}{
        this.props.state.sortedBy === this.props.id
          ? (
            this.props.state.sortDirection === 'up'
            ? ' ↑'
            : ' ↓')
          : ''
      }</th>)
  }
}

export default Table;
