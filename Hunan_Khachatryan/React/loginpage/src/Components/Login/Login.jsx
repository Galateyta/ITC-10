import React, { Component } from 'react';
import { Container, Col, Form, Row, Input, Button, } from 'reactstrap';
import style from './Login.module.css';
import { Link, Redirect } from 'react-router-dom';
import { user } from '../data/data'
import { breakStatement } from '@babel/types';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLogin: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  render() {
    return (
      <div className={style.App} >

        <Form className={style.form} onSubmit={this.handleSubmit}>
          <Container>
            <Row>
              <Col >
                <h2>Sign In</h2>
              </Col>
              <Col md="12">

                <Input
                  type="email"
                  name="email"
                  id="username"
                  placeholder="Email"
                  onChange={this.handleChange}
                  required
                />

              </Col>
              <Col md="12">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Passord"
                  onChange={this.handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Col  >
                <Button className={style.signInButton} onSubmit={this.onSubmit}>Sign in </Button>

                <Link to="/registry" className="comp-class"><Button className={style.signUpButton}>Sign up</Button></Link>
              </Col>
            </Row>
          </Container>
        </Form>

      </div>

    );
  }

  handleChange(e) {
    if (e.target.id === 'username') {
      this.setState({ username: e.target.value });
    } else if (e.target.id === 'password') {
      this.setState({ password: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    for (let i = 0; i < user.length; i++) {
      if (username === user[i].email && password === user[i].password) {
        this.setState({ isLogin: true });
        this.props.history.push('/home');
        break;
      } else {
        alert(`Password or Username is false`);
        break;

      }
    }


  }

}



export default Login;