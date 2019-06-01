import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Login from './Login';
import Slider from './Slider';
import About from './About';
import Table from './Table';
import { Button, Container, NavItem, Collapse } from 'reactstrap';
import home from './Home.module.css';
import { connect } from 'react-redux';
import { deleteUser } from '../actions/userAction';
import SideNav, { Toggle, Nav, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.handleLogut = this.handleLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogout = event => {
    event.preventDefault();
    this.props.dispatch(deleteUser(this.props.user));
    localStorage.removeItem('islogin');
    this.props.history.push('/');
  }

  render() {
    return (
      <BrowserRouter>
        <Container className={home.jumbotron}>
          <SideNav id={home.sideNav}>
            <SideNav.Toggle onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} >
              <SideNav.Nav className={home.Nav} vertical >
                <NavItem className={home.profile}>
                  <div className={home.NavLink} >
                    <img className="img-rounded" src={this.props.user.imagePath} alt="User Image"></img>
                  </div>
                  <h4 className={home.NavLink}>{this.props.user.name}</h4>
                  <h4 className={home.NavLink}>{this.props.user.surname}</h4>
                </NavItem>
                <NavItem className={home.NavItem}>
                  <NavLink className={home.NavLink} to="/slider">Slider</NavLink>
                </NavItem>
                <NavItem className={home.NavItem}>
                  <NavLink className={home.NavLink} to="/about">About</NavLink>
                </NavItem>
                <NavItem className={home.NavItem}>
                  <NavLink className={home.NavLink} to="/table">Table</NavLink>
                </NavItem>
                <NavItem className={home.NavItem}>
                  <Button block onClick={this.handleLogout} color="success" bsSize="large" >
                    Logout
              </Button>
                </NavItem>
              </SideNav.Nav>
            </Collapse>
          </SideNav>
          <Container className={home.container}>
            <Route exact path='/slider' component={Slider} />
            <Route exact path='/about' component={About} />
            <Route exact path='/table' component={Table} />
            <Route exact path='/' component={Login} />
          </Container>
        </Container>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return { ...state };
};
export default connect(mapStateToProps)(Home);