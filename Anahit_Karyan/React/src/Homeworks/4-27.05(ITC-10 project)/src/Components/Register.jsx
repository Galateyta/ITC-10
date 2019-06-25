import React, { Component } from 'react';
import {
  Container, Col, Row, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class Register extends Component {
  constructor() {
    super();
    this.state = {
      loggingIn: false
    };
  }
  componentWillMount() {
  }
  login(event) {
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
        <h2>Register</h2>
        <Form className="form" noValidate>
            <FormGroup>
               <Label for="exampleFile">File</Label>
               <Input type="file" name="file" id="exampleFile" />
            </FormGroup>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Enter username"
                autoCapitalize={false}
                ref="username"
                autoFocus
                disabled={this.loggingIn}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                ref="password"
                disabled={this.loggingIn}
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter name"
                autoCapitalize={false}
                ref="name"
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <Label>Surname</Label>
              <Input
                type="text"
                placeholder="Enter surname"
                autoCapitalize={false}
                ref="syrname"
                autoFocus
              />
            </FormGroup>
            <Row form>
              <legend>Birthday</legend>
              <Col md={3}>
                <FormGroup>
                   <Input
                     placeholder="Day"
                   />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Input
                     placeholder="Month"
                   />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Input
                    placeholder="Years"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Input
                   type="date"
                   name="date"
                   id="exampleDate"
                   placeholder="date placeholder"
                 />
               </FormGroup>
             </Col>
           </Row>
           <FormGroup tag="fieldset">
              <legend>Genus</legend>
           <FormGroup check>
              <Label check>
                <Input type="radio" name="radio"/>
                   Male
              </Label>
          </FormGroup>
          <FormGroup check>
              <Label check>
                <Input type="radio" name="radio"/>
                  Female
              </Label>
          </FormGroup>
          </FormGroup>
          <Button
            type="submit"
            disabled={this.state.loggingIn}
            onClick={this.login.bind(this)}
          >
            Register
          </Button>
          <Button onClick={this.props.cancellInRegister}>Cancell</Button>
        </Form>
      </Container>
    );
  }
}
export default Register;
