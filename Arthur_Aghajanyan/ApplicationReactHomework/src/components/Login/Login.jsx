import React, { Component } from 'react';
import {Container, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './login.css';
import { Link } from 'react-router-dom';
import { data } from '../RegistredUsersData.jsx';


class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        } else if (e.target.id === 'password') {
            this.setState({ password: e.target.value });
        }
    }

    handleSubmit() {
      for(let count = 0; count < data.length; count++){
        if(this.state.email === data[count].email && this.state.password === data[count].password){
          alert("if");
          this.props.history.push('/home');
        }else {
          alert("User does not registred");
        }
      }
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
   }

    render() {
        return (
          <>
              <Container className = "login-page-style">
                  <Form className = 'form-login-inpute ' onSubmit = {this.handleSubmit}>
                  <h5 className = 'title-login-page'>Sign In</h5>
                      <FormGroup>
                          <Label>Email</Label>
                          <Input
                              type = 'email'
                              id = 'email'
                              onChange={this.handleChange}
                              placeholder = 'Enter email'
                              autoComplete = 'on | off'
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label>Password</Label>
                          <Input
                              type = 'password'
                              id = 'password'
                              onChange={this.handleChange}
                              placeholder = 'Enter password'
                              autoComplete = 'on | off'
                          />
                      </FormGroup>
                      <FormGroup >
                          <Label >Remember me</Label>
                          <Input type = 'checkbox' className = 'login-comp-class'/>
                      </FormGroup>
                      <Button color = 'primary' type = 'submit'
                            disabled={!this.validateForm()}>
                            Login
                      </Button>
                      <Link to = '/registry' className = 'login-comp-class'><Button color = 'success'>Registry</Button></Link>
                  </Form>
              </Container>
          </>
        );
    }
}

export default Login;
