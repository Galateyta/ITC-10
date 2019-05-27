import React from 'react';

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
                    <input class="input" type="text" name="login" />
                    <input class="input pass" type="password" name="password" />
                    <input class="remember" name="rememberMe" type="checkbox" value="Remember me!"/>
                    <lable class="small">Remember me</lable>
                    <input class="butten" type="submit" value="Submit" />
                </form>
        );
    }

}

export default Login;