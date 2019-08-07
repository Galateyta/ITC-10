import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { info } from '../info.jsx';
import Log from "./login.module.css";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            pass: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.id === 'mail') {
            this.setState({ email: event.target.value });
        } else if (event.target.id === 'pass') {
            this.setState({ pass: event.target.value });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        for (let i = 0; i < info.length; ++i) {
            if (this.state.mail === info[i].mail && this.state.pass === info[i].pass) {
                this.props.dispatch({
                    type: "ADD_USER",
                    user: info[i]
                });
                
                localStorage.setItem("signUp", true);
                this.props.history.push('/home');
            }
        }

            if(info.length < 1){
                alert("Error: Please enter password again");
            }
    };

    render() {
        return (
            <form className={Log.form} onSubmit={this.handleSubmit}>
                <h1> SIGN IN </h1>
                <input className={Log.input} type="mail" id="mail" onChange={this.handleChange} placeholder="Exemple@mail.com" />
                <input className={Log.input} id="pass" type="password" onChange={this.handleChange} placeholder="Password" />
                <input className={[Log.chack]} id="rememberMe" type="checkbox" value="Remember me!" />
                <lable className={Log.lable}>Remember me</lable>
                <input className={Log.button} type="submit" value="Sign in" />
                <p className={Log.p}> OR </p>
                <p className={Log.small}>(If you have not an account)</p>
                <Link to="/registration" className={[ Log.button, Log.register ]}>
                    <input className={Log.register} type="button" value="Sign up" />
                </Link>
            </form>
        );
    }
}

export default Login;