import React,{Component} from 'react';
import {addUser} from '../../action/addAction';
import IconButton from '@material/react-icon-button';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Slider} from '../slider/Slider';
import {Mycards} from '../card/Cardss';
import img from '../images/1.jpg';
import './Home.css';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.component = this.props.component;
  }
  state = {
    isActive :'drawer-closed'
  }

  changeClassName = () => {
    if(this.state.isActive === 'drawer') {
      let name = this.state.isActive;
	    name = 'drawer-closed';
      this.state.isActive = name;
      this.setState({name});
    } else {
      let name = this.state.isActive;
	    name = 'drawer';
      this.state.isActive = name;
      this.setState({name});
    }
  }

  onClick = (el) => () => {
  	if(el === 1){
  		this.props.history.push("/slider");
		} else if (el === 2) {
  		this.props.history.push("/about");
  	}else if (el === 3) {
  		this.props.history.push("/table");
  	}
  };

  componentWillMount() {;
      const isLogin = localStorage.getItem('isLogin');
      if (isLogin === 'false') {
        this.props.history.push('/login')
      }
  }

  logOut = () => {
    localStorage.setItem('isLogin', false);
    localStorage.setItem('name', '');
    localStorage.setItem('surname', '');
    this.props.addUser({});
    this.props.history = {};
    this.props.history.push('/');
  }

	render () {
    return (
      <div id="ddd">
		    <div id="nav">
		      <div className={this.state.isActive}>
		        <nav className="nav">
						  <div id="photo">
								<img src={img} alt="img"/>
								<div className="info"> <h2>{ localStorage.getItem('name')}</h2> </div>
								<div> <h2> { localStorage.getItem('surname')} </h2> </div>
						  </div>
						  <div className="navLink">
							  <NavLink to="/slider" onClick={this.onClick(1)} > <h3 id="text">	Slider </h3> </NavLink>
						  </div>
						  <div className="navLink">
								<NavLink to="/about" onClick={this.onClick(2)} > <h3 id="text">	About </h3> </NavLink>
						  </div>
						  <div className="navLink">
							  <NavLink to="/table" onClick={this.onClick(3)}>	<h3 id="text"> Table </h3> </NavLink>
						  </div>
					   	<div className="navLink">
							  <NavLink to="/" onClick={this.logOut}> <h3 id="text">	Logout </h3> </NavLink>
						  </div>
				  	</nav>
		      </div>
	      </div>
        <div id="drawerOpener"  onClick={this.changeClassName}>
<MaterialIcon icon="dehaze" />
	      </div>
        {this.component ? this.component : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {user : state.user}
};

const mapDispatchToProps = dispatch => bindActionCreators ({
  addUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
