import React, {Component} from 'react';
import List from './components/List';
import { Col, Container, Row} from 'reactstrap';
import './App.css';

class App extends Component {

  render(){
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">TASKS LIST</h1>
            <List />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
