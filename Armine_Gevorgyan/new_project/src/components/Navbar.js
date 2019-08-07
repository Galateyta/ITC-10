import React,{Component} from 'react';
import '../App.css';

class Navbar extends Component {

	render () {
		return (
				<div >

					<nav className="nav">
						<div>
									<img alt="img"/>
									<div>Name</div>
									<div>Surname</div>
						</div>
						<div>
							<a href="/login">	Slider </a>
						</div>
						<div>
								<a href="/content">	About </a>
						</div>
						<div>
							<a href="/table">	Table </a>
						</div>
						<div>
							<a href="/logout">	Logout </a>
						</div>

					</nav>
				</div>
			);
	}
}

export {Navbar};
