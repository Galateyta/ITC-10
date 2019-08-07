import React, {Component} from 'react';
import List from './list.jsx';
import { Col, Container, Row} from 'reactstrap';
import './App.css';

class App extends Component {

  render(){
  return (
    <Container>
      <Row>
        <Col>
          <List/>
        </Col>
      </Row>
    </Container>
    );
  }
}

export default App;