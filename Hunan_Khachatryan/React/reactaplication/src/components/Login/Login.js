import { Container, Col, Form,FormGroup,Label, Row, Input, Button, } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Login.module.css';
import { users } from '../../data/data'
import { connect } from 'react-redux';
import {addUser} from '../../actions/userAction';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        } else if (e.target.id === 'password') {
            this.setState({ password: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
         var user= {};
        for (let i = 0; i < users.length; i++) {
            if (email === users[i].email && password === users[i].password) {
                user = {
                    name: users[i].name,
                    surename:users[i].surename,
                    username: users[i].username,
                    password: users[i].password,
                    email: users[i].email
                }
                localStorage.setItem('isLogin','true');
                localStorage.setItem('email',user.email);
                this.props.addUser(user);
                this.props.history.push('/home');
                return 1;
            }
        }
        alert(`Password or Username is false`);


    }



    render() {
        return (
            <div className={style.App} >

                <Form className={style.form} onSubmit={this.handleSubmit}>
                    <Container>
                        <Row>
                            <Col >
                                <h2>Sign In</h2>
                            </Col>
                            <Col >

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
                        </Row>
                        <FormGroup >
                          <Label >Remember me</Label>
                          <Input type = 'checkbox' className = 'login-comp-class'/>
                      </FormGroup>
                        <Row>
                            <Col  >
                                <Button className={style.signInButton} onSubmit={this.onSubmit}>Sign in </Button>
                                <Link to="/registry" className="comp-class"><Button className={style.signUpButton}>Sign up</Button></Link>
                            </Col>
                        </Row>
                    </Container>
                </Form>

            </div>

        );
    }    
}
const mapStateToProps = (state) => {
    return {
      users: state.user
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addUser: user => dispatch(addUser(user))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);




