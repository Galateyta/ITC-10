import React, { Component } from 'react';
import { Container, Col, Form, Row, Input, Button, } from 'reactstrap';
import style from './Login.module.css';
import { Link, Redirect } from 'react-router-dom'

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
        <Container>
          <Form className={style.form} onSubmit={this.handleSubmit}>

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
              </Col>
              <Col >
                <Link to="/registry" className="comp-class"><Button className={style.signUpButton}>Sign up</Button></Link>
              </Col>
            </Row>

          </Form>
        </Container>
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

    if (username !== 'username@mail.ru' || password !== 'password') {

      alert(`Password or Username is false`);
    } else {
      this.setState({ isLogin: true });

    }
  }

}



export default Login;