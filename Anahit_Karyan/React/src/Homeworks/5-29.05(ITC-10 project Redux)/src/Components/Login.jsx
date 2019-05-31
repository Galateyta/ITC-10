import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class Login extends Component {
  state = {
  login: '',
  password: ''
}
inputsChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  name === 'login' ? this.setState({login: value}) : this.setState({password: value});
}

login = (e) => {
    e.preventDefault();

    const username = this.refs.username.value;
    const password = this.refs.password.value;

    {/*if (username.length === 0 || password.length === 0) {
      return this.setState({
        errorCode: 'missingUsernameOrPassword'
      });
    }

    this.setState({
      loggingIn: true,
      errorCode: null
    });

    this.props.onLogin(username, password, (err) => {
      if (err) {
        return this.setState({
          error: err,
          loggingIn: false
        });
      }

      if (this.props.location.state && this.props.location.state.nextPathname) {
        window.location.href = this.props.location.state.nextPathname;
      } else {
        window.location.href = '/';
      }

    });*/}
}

  render() {
    return (
      <Container className="App">
        <h2>Sign In</h2>
        <Form className="form" noValidate>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                placeholder="Enter your username"
                name="username"
                onChange={this.inputsChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={this.inputsChange}
              />
            </FormGroup>
              <Label check>
                <Input type="checkbox" />
                Remember me
              </Label>
          </Col>
          <Button
            type="submit"
            disabled={this.state.loggingIn}
            onClick={this.login}
          >Login</Button>
          <Button >Register</Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
