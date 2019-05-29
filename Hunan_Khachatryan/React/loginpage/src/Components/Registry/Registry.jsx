import React, { Component } from 'react';
import {
  Container, Col, Form, Row,
  Input,
  Button,
} from 'reactstrap';
import InputFiles from 'react-input-files';
import style from './Registry.module.css';

class Registry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surename: '',
      username: '',
      password: '',
      email: '',
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
                <h2>Sing up</h2>
              </Col>
              <Col md="12">

                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.handleChange}
                  required
                />

              </Col>
              <Col md="12">

                <Input
                  type="text"
                  name="surename"
                  id="surename"
                  placeholder="Surname"
                  onChange={this.handleChange}
                  required
                />

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
              <label> Choose File</label>
              <InputFiles onChange={files => console.log(files)}>
                <button>Upload</button>
              </InputFiles>

              <Col >
                <Button className={style.signUpButton}>Sign up</Button>
              </Col>


            </Row>
          </Container>
        </Form>

      </div>

    );
  }

  handleChange(e) {
    const elementId = e.target.id;
    switch (elementId) {
      case 'name': this.setState({ name: e.target.value }); break;
      case 'surename': this.setState({ surename: e.target.value }); break;
      case 'email': this.setState({ email: e.target.value }); break;
      case 'username': this.setState({ username: e.target.value }); break;
      case 'password': this.setState({ password: e.target.value }); break;
      default: break;

    }
  }

  handleSubmit(e) {
    e.preventDefault();

  }

}

export default Registry;