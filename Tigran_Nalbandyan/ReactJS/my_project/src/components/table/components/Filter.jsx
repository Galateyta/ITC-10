import React, { Component } from 'react';
import {
  Input,
  Container,
} from 'reactstrap';

class Filter extends Component {
  render() {
    return (<Container>
      <h3>Filter</h3>
      <Input id="filter" onChange={this.props.handleChange} value={this.props.state.searchValue} placeholder="Enter a text for filter..."></Input>
    </Container>);
  }
}

export default Filter;
