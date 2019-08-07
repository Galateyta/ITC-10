import React,{Component} from 'react';
import './Login.css';
import {Registration} from '../registr/Registration';
import {List} from '../List';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addUser} from '../../action/addAction';

class Login extends Component {
	state = {
		userName : '',
		password : '',
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
            if(item == 'userName') {
                return (
                    <div>
                    	<label for="email">
											  <h5 id="lab">Email</h5>
											</label><br/>
											<input
												required
												placeholder='exe@exe.com*'
												onChange={this.onChange(item)}
											/>
										</div>
                  );
            } else if(item == 'password') {
                return (
                	<div>
	                    <div>
	                    	<label for="psw">
												<b>	<h5 id="lab">Password</h5> </b>
												</label><br/>
												<input
													required
													type="password"
													placeholder='Password*'
													onChange={this.onChange(item)}
												/>
											</div>
											<div>
												<input
													className="remember"
													type="checkbox"
													id="remember_me"
													name="_remember_me"
												/>
	    									<label for="remember_me"> Remember Me </label>
											</div>
										</div>
                	);
            		}
					})
    };

		valid = () => {
			const currentUser = this.state;
			const size = List.length;
			for (let i = 0; i < size; ++i) {
				if(currentUser.userName === List[i].userName && currentUser.password === List[i].password) {
					localStorage.setItem('isLogin', true);
					localStorage.setItem('name', List[i].name);
					localStorage.setItem('surname', List[i].surname);
					return true;
				} else {
					localStorage.setItem('isLogin', false);
				}
	  	}
			return false;

		}
		onClick = (el) => () => {
				if(el === 2){
					this.props.history.push("/registr");
				} else if(el === 1){
					if(this.valid()){
						this.props.history.push("/");
					} 
				}
		};

	render() {
		return(
			<div className="login ">
				<h1 id="headr">Login</h1>
				{this.renderInput()}
				<div onClick={this.onClick(1)}>
					<button className="button" >Login</button>
					<button className="button" onClick={this.onClick(2)} >Registr</button>
		  	</div>
			</div>
		);
	}
}



	const mapStateToProps = state => {
	  return {currentUser: state.currentUser}
	};

	const mapDispatchToProps = dispatch => bindActionCreators({
	  addUser
	}, dispatch);



	export default connect(mapStateToProps, mapDispatchToProps)(Login);
