import React from 'react';
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value}); 
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <h1>LOG IN</h1>
                    <input className="input" type="text" name="login" placeholder="Login"/>
                    <input className="input pass" type="password" name="password" placeholder="Password"/>
                    <input className="remember" name="rememberMe" type="checkbox" value="Remember me!"/>
                    <lable className="small">Remember me</lable>
                    <input className="button" type="submit" value="Sign in" />
                    <p>OR</p>
                    <p className="small">(If you have not an account)</p>
                    <input className="button register" type="button" value="Sign up" />
                </form>
        );
    }

}

export default Login;