import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      loggingIn: false
    };
  }
  componentWillMount() {
  }
  submit(event) {
    event.preventDefault();

    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if (username.length === 0 || password.length === 0) {
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

    });
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
                type="text"
                id="exampleName"
                placeholder="Enter your username"
                autoCapitalize={false}
                ref="username"
                autoFocus
                disabled={this.loggingIn}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Enter your password"
                ref="password"
                disabled={this.loggingIn}
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
            onClick={this.submit.bind(this)}
          >Login</Button>
          <Button onClick={this.props.registerInLogin}>Register</Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
