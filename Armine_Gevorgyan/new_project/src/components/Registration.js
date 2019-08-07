import React,{Component} from 'react';

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
						if(this.state.url != ''){
								const originYRL = this.state.url;
								this.state.url = "./images/" + originYRL.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
						}
						return (
							<div>
							<input type="file" value='' onChange={this.onChange(item)}/>
							<img src={this.state.url} alt="img"/>
							</div>
						);
					}else	if(item == 'userName') {
                return (
                    <div  id="regDiv">
                    	<label for="email"><b>Email</b></label>
                    	<br/>
						<input type='email' name='email' required peattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' placeholder='exe@exe.com'  onChange={this.onChange(item)} />
					</div>
                    );
            } else if(item == 'password') {
                return (
                    <div id="regDiv">
                    	<label for="psw"><b>Password</b></label>
                    	<br/>
						<input required type="password" pattern="(?=.*\d)(?=.*[+,!,-,/])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and one symbol  +,-,! or / , and at least 8 or more characters" placeholder='Password' onChange={this.onChange(item)} />
					</div>
                );
            } else if(item == 'name') {
                return (
                    <div id="regDiv">
                    	<label for="name"><b>Name</b></label>
                    	<br/>
                    	<input placeholder='Name' onChange={this.onChange(item)} />
					</div>
                );
            } else if(item == 'surname') {
                return (
                    <div id="regDiv">
                    	<label for="surname"><b>Surname</b></label><br/>
                    	<input placeholder='Surname' onChange={this.onChange(item)} />
									  </div>
                );
            } else if(item == 'bDay'){
							return (
								<div id="regDiv">
									<label for="bDay"><b>Birth Day</b></label><br/>
									<input required type="date" id="name" name="trip-start"
										value={this.state.startDate}
										min="2000-01-01"   onChange={this.onChange(item)}
									/>
								</div>
							);
						} else if(item == 'gender') {
                return (
                	<form id="regDiv">
                		<label for="gender"><b>Gender</b></label>
                		<br/>
                		<div className="radio">
					      <label>
					        <input type="radio" name="gender" value='1' onChange={this.onChange(item)}/>
					        Male
					      </label>
					    </div>
					    <div className="radio">
					      <label>
					        <input type="radio"  name="gender" value='2' onChange={this.onChange(item)} />
					        Female
					      </label>
					    </div>
                	</form>
                );
            }

        })
    };


	render () {
		return (
			<div  id="reg">
				{this.renderInput()}
				<form onSubmit={this.onSubmit}>
					<button id="regDiv">Registration</button>
					<button >Cancell</button>
				</form >
			</div>
			);
	}

}

export {Registration}
