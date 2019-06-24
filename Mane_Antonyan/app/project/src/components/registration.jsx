import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Reg from './registration.module.css';
import { info } from '../info.jsx';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail : '',
            name : '',
            surname : '',
            pass : '',
            image : '',
            date : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case 'mail' :
                this.setState({ mail : event.target.value });
                break;
            
            case 'name' :
                this.setState({ name : event.target.value });
                break;
            
            case 'surname' :
                this.setState({ surname : event.target.value });
                break;
            
            case 'pass' :
                this.setState({ pass : event.target.value });
                break;
          
            case 'date' :
                this.setState({ date : event.target.value });
                break;
            
            default :
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const newUser = {
            mail: this.state.mail,
            name: this.state.name,
            surname: this.state.surname,
            pass: this.state.pass,
            date: this.state.date
        };

        info.push(newUser);
        this.props.history.push('/');
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit} className={Reg.form}>
                <h1 className={Reg.h1}>REGISTRATION</h1>
                <input className={ Reg.input } type="text" id="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} required />
                <input className={ Reg.input } type="text" id="surname" placeholder="Surname" onChange={this.handleChange} value={this.state.surname} required />
                <input className={ Reg.input } type="text" id="mail" placeholder="E-mail adress" value={this.state.mail} onChange={this.handleChange} required />
                <input className={Reg.input} type="date" id="date" onChange = {this.handleChange} value={this.state.date} required/>
                <input className={`${Reg.input} ${Reg.pass}`} type="password" id="pass" placeholder="Password" onChange={this.handleChange} value={this.state.pass} required />
                <input className={Reg.input} type="file" id="file" onChange = {this.handleChange} value={this.state.image} />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFSgYtP-kF6g0B7LSOxgHo5qBmdLj6utoNhAZou7lsoUUz7RiTDw" alt="User pic"/>
                <div className={Reg.div}>
                    <input type="radio" name='gender' value="male" required/>
                    <p className={Reg.p}> Male </p>
                    <input type="radio" name='gender' value="female" required/>
                    <p className={Reg.p}> Female </p>
                </div>
                <input type="submit" className={` ${Reg.button} ${Reg.input} `} value="Sign in" value="Submit" required />
                <Link to = '/'>
                    <input className={` ${Reg.button} ${Reg.cancel} `} type="button" value="Cancel"/>
                </Link>
            </form>                     
        );
    }
}

export default Registration;