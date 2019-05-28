import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import login from './Login.module.css';
class Register extends Component {
    render() {
        return (
            <div className={login.Login}>
                <Form  className={login.form}>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="email" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleEmail">Password</Label>
                            <Input type="password" name="password" id="exampleEmail" placeholder="password" />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleAddress">Name</Label>
                            <Input type="text" name="name" id="exampleAddress" placeholder="name" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleAddress2">Surname</Label>
                            <Input type="text" name="Surname" id="exampleAddress2" placeholder="surname" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleDate">Date</Label>
                            <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleFile">Image</Label>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                Choose your image
                            </FormText>
                        </Col>
                    </FormGroup>

                    <FormGroup row check>
                        <Col sm={12}>
                            <Label check>
                                <Input type="radio" name="radio2" />Male
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row check>
                        <Col sm={12}>
                            <Label check>
                                <Input type="radio" name="radio2"/>Female
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Button inline color="success" bsSize="large" type="submit">
                                Register
                        </Button>
                            <Button inline color="primary" bsSize="large" type="submit" >
                                Cancel
                        </Button>
                        </Col>

                    </FormGroup>
                </Form>

            </div>
        );
    }
}
export default Register;