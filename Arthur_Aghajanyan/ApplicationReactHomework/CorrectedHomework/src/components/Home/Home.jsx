import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import { Button} from 'reactstrap';
import './home.css'
import { connect } from 'react-redux';
import SideNav, { NavItem } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            date: ''
        };
        this.signUpLocStorage = this.signUpLocStorage.bind(this);
    }
    signUpLocStorage() {
        localStorage.setItem("signUp", false);
        this.props.history.push('/');

    };
    render() {
          return (
                <div className = 'home-style'>
                    <div className = 'left-container'>
                        <SideNav id = "side-nave-id">
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="home">
                                <NavItem>
                                    <div className = 'user-img-style'>
                                    <img src = 'https://image.flaticon.com/icons/png/512/149/149071.png' alt = 'img'/>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <h5>name</h5>
                                </NavItem>
                                <NavItem>
                                    <h5>surname</h5>
                                </NavItem>
                                <NavItem>
                                    <h6>data</h6>
                                </NavItem>
                                <NavItem eventKey="home">
                                    <NavLink to = '/home'>Home</NavLink>
                                </NavItem>
                                <NavItem eventKey="about">
                                    <NavLink to = '/home/about'>About</NavLink>
                                </NavItem>
                                <NavItem eventKey="slider">
                                    <NavLink to = '/home/slider'>Slider</NavLink>
                                </NavItem>
                                <NavItem eventKey="table">
                                    <NavLink to = '/home/table'>Table</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button color = 'primary' onClick = {this.signUpLocStorage}>
                                    Logout
                                    </Button>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                    </div>
                    <div className = 'right-container'>
                    {this.props.component}
                    </div>
                </div>
                );
            }
}
export default connect() (Home);
