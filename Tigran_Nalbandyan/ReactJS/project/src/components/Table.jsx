import React, {Component} from 'react';
import {MdClose} from 'react-icons/md';
import Modal from './Modal.jsx';
import {Row, Col, Pagination, PaginationItem, PaginationLink} from 'reactstrap';

class Table extends Component {
  state = {
    offset: 0,
    limit: 2
  }

  render() {
    const offset = this.state.offset;
    const limit = this.state.limit;
    const items = this.props.state.items;
    const onSort = this.props.onSort;
    const state = this.props.state;

    return (<div id="table">
      <table border="1" className="sortable">
        <thead>
          <tr>
            <TableHead id='id' text='№' onSort={onSort} state={state}/>
            <TableHead id='name' text='Name' onSort={onSort} state={state}/>
            <TableHead id='priorityValue' text='Priority' onSort={onSort} state={state}/>
            <TableHead id='date' text='Date' onSort={onSort} state={state}/>
          </tr>
        </thead>
        <tbody>
          {
            items.map(
              (item, index) => item.visible && index >= offset && index < offset + limit
              ? (<tr key={item.id}>
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
                    <Modal item={item} index={index} changeItem={this.props.changeItem}/>
                  </div>
                </td>
              </tr>)
              : null)
          }
          <tr className="bg-white">
            <td colSpan="4">
              <Pagination>
                <Row className="container-fluid">
                  <Col>
                    <center>
                      <PaginationItem disabled={offset < 1
                          ? true
                          : false}>
                        <PaginationLink onClick={() => this.changeOffset(-2)}>{'Prev'}</PaginationLink>
                      </PaginationItem>
                    </center>
                  </Col>
                  <Col>
                    <center>
                      <PaginationItem disabled={offset + limit >= items.length
                          ? true
                          : false}>
                        <PaginationLink onClick={() => this.changeOffset(2)}>{'Next'}</PaginationLink>
                      </PaginationItem>
                    </center>
                  </Col>
                </Row>
              </Pagination>
            </td>
          </tr>
        </tbody>
      </table>
      <span>Showed {offset + 1} to {offset + limit <= items.length ? offset + limit : items.length} of {items.length}</span>
    </div>);
  }

  changeOffset = (n) => {
    let offset = this.state.offset + n;
    this.setState({offset});
    console.log(offset, this.props.state.items)
  }
}

class TableHead extends React.Component {
  render() {
    return (<th onClick={e => this.props.onSort(e, this.props.id)}>
      <span>{this.props.text}{
          this.props.state.sortedBy === this.props.id
            ? (
              this.props.state.sortDirection === 'up'
              ? ' ↑'
              : ' ↓')
            : ''
        }</span>
    </th>)
  }
}

export default Table;
