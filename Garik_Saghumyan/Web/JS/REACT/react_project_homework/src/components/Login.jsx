import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Col, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import login from './Login.module.css';

class Login extends Component {

    state = {
        email: "",
        password: "",
        redirect: false
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.email === 'admin@admin.com' && this.state.password === 'password1') {
            this.setState({
                redirect: true
            });
        }
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home' />
        }else {
            // alert('invalid username or password')
        }
    }

    render() {
        return (
            <div className={login.Login}>
                <Form  className={login.form} onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input type="email" name="email" id="email" placeholder="username" value={this.state.email} onChange={this.handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input type="password" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row check>
                        <Input type="checkbox" checked />
                        Remember me
                    </FormGroup>
                    <FormGroup >
                        {this.renderRedirect()}
                        <Button block onClick={this.handleSubmit} color="success" bsSize="large" type="submit">
                            Login
                        </Button>
                        <Button block color="primary" bsSize="large" type="submit" >
                            Register
                        </Button>
                    </FormGroup>
                </Form>
            </div>

        );
    }
}
export default Login;