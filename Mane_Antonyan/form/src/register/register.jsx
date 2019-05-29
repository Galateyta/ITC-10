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
                <input className="input" type="text" name="Name" placeholder="Name"/>
                <input className="input" type="text" name="Surname" placeholder="Surname"/>
                <input className="input" type="text" name="login" placeholder="User name/ login"/>
                <input className="input date" type="date" name="login"/>
                <input className="input pass" type="password" name="password" placeholder="Password"/>
                <input className="input pass" type="password" name="password" placeholder="Confirm password"/>
                <input className="button" type="submit" value="Sign in"/>
                <input className="button cancel" type="button" value="Cancel"/>
            </form>
        );
    }

}

export default Register;