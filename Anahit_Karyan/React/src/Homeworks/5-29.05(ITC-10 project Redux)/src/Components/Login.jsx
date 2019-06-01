import React, { Component } from 'react';
import users from './../data/users';
import addUserAction from './../actions/user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';


class Login extends Component {
  state = {
  username: '',
  password: ''
}
inputsChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  name === 'username' ? this.setState({username: value}) : this.setState({password: value});
}

login = (e) => {
    e.preventDefault();

    const username = this.state.username;
    const password = this.state.password;
    console.log(username);console.log(password);
    console.log({users});
    const corentUser = users.find((item)=> {
      return item.username === username && item.password === password;
    }); console.log(corentUser)
    console.log('corent usern e'+ corentUser);
    if(corentUser){
      this.props.addUserAction(corentUser);
      localStorage.setItem('isLogin', true);
      this.props.history.push('/home');

      console.log('logini props');
      console.log(this.props);
    }
}

  render() {
    console.log('logini props');

    console.log(this.props);
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
          <Button type="submit" onClick={this.login}>
            Login
          </Button>
          <Button  onClick={() => {this.props.history.push('/register');}}>
            Register
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {users: state.users}
};

const mapDispatchToProps = dispatch => bindActionCreators({
   addUserAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
