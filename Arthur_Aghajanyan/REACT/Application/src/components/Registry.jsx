import React from 'react';
import {Container, Form, FormGroup, Label, Input, Button, FormText} from 'reactstrap';
import { Link } from 'react-router-dom'


class Registry extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        pictures: [],
        information: [],
        name: '',
        surname: '',
        email: '',
        password: '',
        date: ''
      };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleChange.bind(this);
        this.onDrop = this.onDrop.bind(this);

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
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
      alert("this.state");
      e.preventDefault();
    }

    render() {
      return (
          <div>
              <p>Regist page</p>
              <Container className = "registery-page-style">
                  <Form className = 'form' onSubmit = {this.handleSubmit}>
                  <FormGroup>
                      <Label>Name</Label>
                      <Input
                          type = 'text'
                          id = 'name'
                          onChange={this.handleChange}
                          placeholder = 'Enter your name'
                          autoComplete = 'on | off'
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
                              required
                              />
                      </FormGroup>
                      <FormGroup>
                          <Input type="file" name="file" id="exampleFile" required />
                          <Input type = 'radio'  name = 'gender'  value = 'male' required/>
                          <FormText className = 'comp-class-gener'>male</FormText>

                      </FormGroup>
                      <FormGroup>
                          <Input type = 'radio'  name = 'gender' value = 'female' required/>
                          <FormText className = 'comp-class-gener'>female</FormText>
                      </FormGroup>
                          <Button color = 'success'>Registry</Button>
                          <Link to = '/'><Button color = 'info' className = 'comp-class'>Cancel</Button></Link>

                      </Form>

                  </Container>
          </div>
      );
    }
}
export default Registry;
