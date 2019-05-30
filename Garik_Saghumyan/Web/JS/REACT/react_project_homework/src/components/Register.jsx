import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import login from './Login.module.css';
import data from '../data';
// import {connect} from 'react-redux';
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            surname: '',
            birthday: '',
            imagePath: '',
            gender: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleImgChange = (event) => {
        this.setState({
            imagePath: event.target.files[0].name
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,
            birthday: this.state.birthday,
            imagePath: this.state.imagePath,
            gender: this.state.gender
        }
        data.push(newUser);
        this.setState({
            email: '',
            password: '',
            name: '',
            surname: '',
            birthday: '',
            imagePath: '',
            gender: '',
            redirect: true
        })
    }
   
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }     
    render() {
        return (
            <div className={login.Login}>
                <Form onSubmit={this.handleSubmit} className={login.form}>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleEmail">Email</Label>
                            <Input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="email" placeholder="email" required />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleEmail">Password</Label>
                            <Input value={this.state.password}  onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" required/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleAddress">Name</Label>
                            <Input value={this.state.name} onChange={this.handleChange} type="text" name="name" id="name" placeholder="name" required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleAddress2">Surname</Label>
                            <Input value={this.state.surname} onChange={this.handleChange} type="text" name="Surname" id="surname" placeholder="surname" required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleDate">Date</Label>
                            <Input value={this.state.birthday} onChange={this.handleChange} type="date" name="date" id="birthday" placeholder="date placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="exampleFile">Image</Label>
                            <Input  onChange={this.handleImgChange} type="file" name="file" id="imagePath" required/>
                            <img src={this.state.imagePath}></img>
                            <FormText color="muted">
                                Choose your image
                            </FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row check>
                        <Col sm={12}>
                            <Label check>
                                <Input value={this.state.gender} onChange={this.handleChange} type="radio" name="radio1" id="gender" />Male
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row check>
                        <Col sm={12}>
                            <Label check>
                                <Input value={this.state.gender} onChange={this.handleChange} type="radio" name="radio1"  id="gender1"/>Female
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            {this.renderRedirect()}
                            <Button   inline color="success" bsSize="large" type="submit">
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