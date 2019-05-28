import React, { Component } from 'react';
import {Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import '.././App.css';
import { Link } from 'react-router-dom'


class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        } else if (e.target.id === 'password') {
            this.setState({ password: e.target.value });
        }
    }
    handleSubmit() {
      console.log('clicked login button');
    }
    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
   }


    render() {
        return (
          <div>
              <p>Login page</p>
              <Container className = "login-page-style">
                  <Form className = 'form' onSubmit = {this.handleSubmit}>
                      <FormGroup>
                          <Label>Email</Label>
                          <Input
                              type = 'email'
                              id = 'email'
                              onChange={this.handleChange}
                              placeholder = 'Enter your email ,example - myemail@email.com'
                              autoComplete = 'on | off'
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label>Password</Label>
                          <Input
                              type = 'password'
                              id = 'password'
                              onChange={this.handleChange}
                              placeholder = 'Enter your password ,example - mypassword'
                              autoComplete = 'on | off'
                          />
                      </FormGroup>
                      <FormGroup >
                          <Label >Remember me</Label>
                          <Input type = 'checkbox' className = 'comp-class'/>
                      </FormGroup>
                      <Button color = 'primary' type = 'submit'
                            disabled={!this.validateForm()}>
                            Login
                      </Button>
                      <Link to = '/registry' className = 'comp-class'><Button color = 'warning'>Registry</Button></Link>
                  </Form>
              </Container>
          </div>
        );
    }
}

export default Login;
