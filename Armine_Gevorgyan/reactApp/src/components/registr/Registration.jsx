import React,{Component} from 'react';
import './Registration.css';
import {List} from '../List';

class Registration extends Component {

		state = {
		url:'',
		userName : '',
		password : '',
		name: '',
		surname: '',
		bDay: '',
		gender: '',

}

	onChange = (item) => (e) => {
    	this.onChange = this.onChange.bind(this);
        if(e.target ) {
            this.setState({
                [item]: e.target.value
            });
        }
  }

    renderInput = () => {
        return Object.keys(this.state).map( (item) => {
					if (item == 'url') {
						return (
							<div id="registration">
							<input type="file" value='' onChange={this.onChange(item)}/>
							<img  alt="img"/>
							</div>
						);
					}else	if(item == 'userName') {
                return (
                    <div  id="regDiv">
                    	<label for="email">
											  <h4>Email</h4>
											</label>
											<input
												type='email'
												name='email'
												required
												peattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
												placeholder='exe@exe.com'
												onChange={this.onChange(item)}
											/>
									</div>
                );
            } else if(item == 'password') {
                return (
                    <div id="regDiv">
                    	<label for="psw">
												<h4>Password</h4>
											</label>
											<input
												required
												type="password"
												pattern="(?=.*\d)(?=.*[+,!,-,/])(?=.*[A-Z]).{8,}"
												title="Must contain at least one number and one uppercase and one symbol  +,-,! or / , and at least 8 or more characters"
												placeholder='Password'
												onChange={this.onChange(item)}
											/>
										</div>
                );
            } else if(item == 'name') {
                return (
                    <div id="regDiv">
                    	<label for="name">
												<h4>Name</h4>
											</label>
                    	<input
											  placeholder='Name'
											  onChange={this.onChange(item)}
											/>
									  </div>
                );
            } else if(item == 'surname') {
                return (
                    <div id="regDiv">
                    	<label for="surname"
												><h4>Surname</h4>
											</label>
                    	<input
											  placeholder='Surname'
												onChange={this.onChange(item)}
											/>
									  </div>
                );
            } else if(item == 'bDay'){
							return (
								<div id="regDiv">
									<label for="bDay">
									  <h4>Birth Day</h4>
									</label>
									<input
										required
										type="date"
										name="trip-start"
										min="1950-01-01"
										onChange={this.onChange(item)}
									/>
								</div>
							);
						} else if(item == 'gender') {
                return (
                	<div id="gend">
                		<label for="gender">
										  <h4 id="hhh">Gender</h4>
										</label>
                		<div id="radio1">
					      			<label id="radio">
					        			<input
												  id="radio1"
													type="radio"
													name="gender"
													value='1'
													onChange={this.onChange(item)}
												/>
					        			Male
					      			</label>
					    			</div>
					    			<div id="radio1">
					      			<label id="gender">
					        			<input
													id="radio1"
													type="radio"
													name="gender"
													value='2'
													onChange={this.onChange(item)}
												/>
					        			Female
							      </label>
							    </div>
                </div>
                );
            }
        })
    };

		onSubmit = (e) => { 
			e.preventDefault();
			List.push(this.state);
			this.props.history.push("/login");
		}

		onClick =  () => {
	    this.props.history.push("/login");
	  }

		render () {
			return (
				<div  id="registration">
					<h1>Registrtation</h1>
					{this.renderInput()}
					<form onSubmit = {this.onSubmit}>
						<button id="butonn" >Registration</button>
						<button id="butonn" onClick={this.onClick}>Cancel</button>
					</form>
				</div>
				);
		}
}

export {Registration}
