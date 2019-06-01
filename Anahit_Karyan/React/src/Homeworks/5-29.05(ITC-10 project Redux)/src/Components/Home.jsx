import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React from 'react';
import About from './About';
import Slider from './Slider';
import TableSection from './Table/TableSection';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import user1 from './../images/user1.png';
import { NavLink } from 'react-router-dom'

class Home extends React.Component {
  render() {
    console.log('homi props');

    console.log(this.props);

    return (
      <Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="slider">
                    <NavItem >
                        <img src={user1} alt="UserImage" />
                    </NavItem>
                    <NavItem >
                        <h3>{this.props.users.user.name}</h3>
                    </NavItem>
                    <NavItem >
                        <h3>{this.props.users.user.surname}</h3>
                    </NavItem>
                    <NavItem eventKey="slider">
                      <NavLink to='/home/slider'>
                          Slider
                      </NavLink>
                    </NavItem>
                    <NavItem eventKey="about">
                        <NavLink to='/home/about'>
                            About
                        </NavLink>
                    </NavItem>
                    <NavItem eventKey="table">
                      <NavLink to='/home/table'>
                          Table
                      </NavLink>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <button>Log Out</button>
            <div>
                <Route path="/home/slider" exact component={Slider} />
                <Route path="/home/about" component={About}/>
                <Route path="/home/table" component={TableSection} />
            </div>
        </React.Fragment>
    )}
    />
</Router>

    );
  }
}
const mapStateToProps = state => {
  return {users: state.users};
};
export default connect(mapStateToProps)(Home);
