import React, { Component } from 'react';
import {
    Container, Col, Form, Row,
    Input,
    Button,
} from 'reactstrap';
import style from './Registry.module.css';
import { users } from '../../data/data'

class Registry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surename: '',
            username: '',
            password: '',
            email: '',
            date:'',
            picture:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        const elementId = e.target.id;
        switch (elementId) {
            case 'name': this.setState({ name: e.target.value }); break;
            case 'surename': this.setState({ surename: e.target.value }); break;
            case 'email': this.setState({ email: e.target.value }); break;
            case 'username': this.setState({ username: e.target.value }); break;
            case 'password': this.setState({ password: e.target.value }); break;
            case 'date': this.setState({ date: e.target.value }); break;
            case 'file':this.setState({ picture: e.target.value }); break;
            default: break;

        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const curentUser ={
            name: this.state.name,
            surename: this.state.surename,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            picture:this.state.picture
        }
        users.push(curentUser);
        this.props.history.push('/');

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
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="User Name"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Col>

                            <Col md="12">

                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
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
                            <Col><Input
                              type = 'date'
                              name='date'
                              id = 'date'
                              onChange = {this.handleChange}
                              autoComplete = 'on | off'
                              required
                              /></Col>
                            <Col md="12">
                                <Input
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={this.handleChange}
                                    required
                                />
                            </Col>

                            <Col >
                                <Button className={style.signUpButton} onSubmit={this.handleSubmit}>Sign up</Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>

            </div>

        );
    }



}

export default Registry;