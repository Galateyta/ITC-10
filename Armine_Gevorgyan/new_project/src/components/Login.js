import React,{Component} from 'react';
import '../App.css';
import {Registration} from './Registration'

class Login extends Component {
	state = {
		userName : '',
		password : '',
	}

	onChange = (item) => (e) => {
		alert(item);
    	this.onChange = this.onChange.bind(this);
        if(e.target ) {
            this.setState({
                [item]: e.target.value
            });
        }
    }

    renderInput = () => {
        return Object.keys(this.state).map( (item) => {
            if(item == 'userName') {
                return (
                    <div>
                    	<label className="label" for="email"><b>Email</b></label><br/>
						<input type='email' name='email'
							required peattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
							placeholder='exe@exe.com'  onChange={this.onChange(item)}
						/>
					</div>
                    );
            } else if(item == 'password') {
                return (
                	<div>
	                    <div>
	                    	<label className="label" for="psw"><b>Password</b></label><br/>
							<input required type="password" placeholder='Password' onChange={this.onChange(item)} />
						</div>
						<div>
							<input className="remember" type="checkbox" id="remember_me" name="_remember_me"  />
	    					<label for="remember_me">Remember Me</label>
						</div>
					</div>
                );
            }

        })
    };

		onClick = () => {
				this.href = "/registr";
					}

	render() {
		return(
			<a href="/" >
			<div className="login">
				<h1>Login</h1>
				{this.renderInput()}
				<form onSubmit={this.onSubmit}>
					<button className="button" >Login</button>
					<button className="button" onClick={this.onClick} href="/registr">Registr</button>
				</form >
				<Registration/>
			</div>
			</a>
		);
	}
}

export {Login}
