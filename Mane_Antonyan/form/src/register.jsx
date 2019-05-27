import React from 'react';
import './register.css';

class Register extends React.Component {
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
                    <h1>REGISTRATION</h1>
                    <input class="input" type="text" name="Name" placeholder="Name"/>
                    <input class="input" type="text" name="Surname" placeholder="Surname"/>
                    <input class="input" type="text" name="login" placeholder="User name/ login"/>
                    <input class="input pass" type="password" name="password" placeholder="Password"/>
                    <input class="input pass" type="password" name="password" placeholder="Confirm password"/>
                    <input class="button" type="submit" value="Sign in" />
                </form>
        );
    }

}

export default Register;