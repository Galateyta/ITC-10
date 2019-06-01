import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import register from './Register.module.css';
import data from '../data';
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
            gender: this.state.gender,
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
        })
        this.props.history.push('/');
    }
    handleCancel = event => {
        event.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={register.Register}>
                <Form onSubmit={this.handleSubmit} className={register.form}>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="email">Email</Label>
                            <Input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="email" placeholder="email" required />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="password">Password</Label>
                            <Input value={this.state.password} onChange={this.handleChange} type="password" name="password" id="password" placeholder="password" required />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="name">Name</Label>
                            <Input value={this.state.name} onChange={this.handleChange} type="text" name="name" id="name" placeholder="name" required />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="surname">Surname</Label>
                            <Input value={this.state.surname} onChange={this.handleChange} type="text" name="surname" id="surname" placeholder="surname" required />
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
                            <Input onChange={this.handleImgChange} type="file" name="file" id="imagePath" />
                            <img src={this.state.imagePath} ></img>
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
                                <Input value={this.state.gender} onChange={this.handleChange} type="radio" name="radio1" id="gender1" />Female
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Button inline color="success" bsSize="large" type="submit">
                                Register
                            </Button>
                            <Button inline  color="danger" onClick={this.handleCancel}>
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