import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import login from './Login.module.css';
import data from '../data';
import { connect } from 'react-redux';
import { addUser } from '../actions/userAction';
import store from '../store';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        data.map((user) => {
            if (user.email === this.state.email && user.password === this.state.password) {
                this.props.dispatch(addUser(user));
                localStorage.setItem('islogin', true);
                this.props.history.push('/home');
            } else {
                alert('Invalid username or password');
            }
        })
    }
    handleRegister = event => {
        event.preventDefault();
        this.props.history.push('/register');
    }

    render() {
        return (
            <div className={login.Login}>
                <Form className={login.form} onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="username" value={this.state.email} onChange={this.handleChange} required />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />
                        </Col>
                    </FormGroup>
                    <FormGroup row check>
                        <Input type="checkbox" checked />
                        Remember me
                    </FormGroup>
                    <FormGroup >
                        <Button block onClick={this.handleSubmit} color="success" bsSize="large" type="submit">
                            Login
                        </Button>
                        <Button block color="danger" onClick={this.handleRegister}>
                            Register
                        </Button>
                    </FormGroup>
                </Form>
            </div>

        );
    }
}
export default connect()(Login);