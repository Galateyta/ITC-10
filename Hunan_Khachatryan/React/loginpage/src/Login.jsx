import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, FormText, Label, Input,
  Button,
} from 'reactstrap';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <Container className="App">
        
        <Form className="form">
        <h2>Sign In</h2>
          <Col >
            
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Email"
                required 
              />

          </Col>
          <Col>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Passord"
                required
              />
          </Col>
          <Col>
            <Button  className = "signInButton">Sign in </Button>
          </Col>
          <Col>
          <Button className = "signUpButton">Sign up</Button>
          </Col>

        </Form>
      </Container>
    );
  }
}

export default Login;