import React from 'react';
import {Container, Form, FormGroup, Label, Input, Button, FormText} from 'reactstrap';
import { Link } from 'react-router-dom'
import './registry.css';
import { data } from '../RegistredUsersData.jsx'

class Registry extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        pictures: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        date: ''
      };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        switch (e.target.id) {
          case 'name':
              this.setState({ name: e.target.value });
              break;
          case 'surname':
              this.setState({ surname: e.target.value });
              break;
          case 'email':
              this.setState({ email: e.target.value });
              break;
          case 'password':
              this.setState({ password: e.target.value });
              break;
          case 'date':
              this.setState({ date: e.target.value });
              break;
          default:
        }
    }

    handleSubmit(e) {
      e.preventDefault();

      const newInfo = {
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
          date: this.state.date
      };
        data.push(newInfo);
        this.props.history.push('/');
    }

    render() {
      return (
          <>
              <Container className = 'registery-page-style'>
                  <Form className = 'form-registry-inpute' onSubmit = {this.handleSubmit}>
                      <h5 className = 'title-registr-page'>Sign Up</h5>
                      <FormGroup>
                          <Label>Name</Label>
                          <Input
                              type = 'text'
                              id = 'name'
                              onChange={this.handleChange}
                              placeholder = 'Enter your name'
                              autoComplete = 'on | off'
                              value={this.state.name}
                              required
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label>Surname</Label>
                          <Input
                              type = 'text'
                              id = 'surname'
                              onChange={this.handleChange}
                              placeholder = 'Enter your surname'
                              autoComplete = 'on | off'
                              value={this.state.surname}
                              required
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label>Email</Label>
                          <Input
                              type = 'email'
                              id = 'email'
                              onChange={this.handleChange}
                              placeholder = 'Enter your email ,example - myemail@email.com'
                              autoComplete = 'on | off'
                              value={this.state.email}
                              required
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
                              value={this.state.password}
                              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
                              title="Lowercase and uppercase Latin letters, numbers, special characters. Minimum 8 characters"
                              required
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label>Birthday</Label>
                          <Input
                              type = 'date'
                              id = 'date'
                              onChange = {this.handleChange}
                              autoComplete = 'on | off'
                              value={this.state.date}
                              required
                          />
                      </FormGroup>
                      <FormGroup >
                          <Input type = 'file'
                                 onChange = {this.handleChange}
                                 value = {this.state.pictures}
                                 id = 'file'
                                 className = 'exampleFile'
                                
                                  />
                                 <img src = {this.state.pictures} alt = 'img'/>
                          <div className = 'gender-style'>
                              <Input type = 'radio'  name = 'gender'  value = 'male' required/>
                              <FormText>male</FormText>
                              <Input type = 'radio'  name = 'gender' value = 'female' required/>
                              <FormText>female</FormText>
                          </div>
                      </FormGroup>
                      <Button color = 'success'>Registry</Button>
                      <Link to = '/'><Button color = 'info' className = 'registry-comp-class'>Cancel</Button></Link>
                  </Form>
              </Container>
          </>
      );
    }
}
export default Registry;
