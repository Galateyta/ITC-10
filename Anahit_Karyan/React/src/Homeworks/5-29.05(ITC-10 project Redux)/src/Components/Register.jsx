import React, { Component } from 'react';
import {
  Container, Col, Row, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import users from '../data/users';

class Register extends Component {
  state = {
    img: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    date: '',
    gemus: ''

  }
  inputsChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log('kanchvel e inoputChange' + name + value)
    switch(name) {
      case 'image':
        this.setState({image: value});
        break;
      case 'username':
        this.setState({username: value});
        break;
      case 'password':
        this.setState({password: value});
        break;
      case 'name':
        this.setState({name: value});
        break;
      case 'surname':
        this.setState({surname: value});
        break;
      case 'date':
        this.setState({date: value});
        break;
      default:
        break;
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = Object.assign(this.state);
    users.push(newUser);
    console.log(users);
    this.props.history.push('/login')
  }
  render() {
    return (
      <Container className="App">
        <h2>Register</h2>
        <Form className="form" noValidate>
            <FormGroup>
               <Label for="exampleFile">Add image</Label>
               <Input type="file" name="image" onChange={this.inputsChange}/>
            </FormGroup>
            <FormGroup>
              <Label>Username</Label>
              <Input
                placeholder="Enter username"
                autoCapitalize={false}
                name="username"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input
                placeholder="Enter name"
                autoCapitalize={false}
                name="name"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Surname</Label>
              <Input
                type="text"
                placeholder="Enter surname"
                autoCapitalize={false}
                name="surname"
                onChange={this.inputsChange}
                required
              />
            </FormGroup>
            <Row form>
              <legend>Birthday</legend>
              {/*// <Col md={3}>
              //   <FormGroup>
              //      <Input
              //        placeholder="Day"
              //      />
              //   </FormGroup>
              // </Col>
              // <Col md={3}>
              //   <FormGroup>
              //     <Input
              //        placeholder="Month"
              //      />
              //   </FormGroup>
              // </Col>
              // <Col>
              //   <FormGroup>
              //     <Input
              //       placeholder="Years"
              //     />
              //   </FormGroup>
              // </Col>*/}
              <Col>
                <FormGroup>
                  <Input
                   type="date"
                   name="date"
                   id="exampleDate"
                   placeholder="date placeholder"
                   onChange={this.inputsChange}
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
          <Button type="submit" onClick={this.handleSubmit}>
            Register
          </Button>
          <Button  onClick={() => {}}>
            Cancell
          </Button>
        </Form>
      </Container>
    );
  }
}
export default Register;

{/* mnuma avelacnel radioi arjeqn el statum u Cancell sexmelis gnal login opage*/}
