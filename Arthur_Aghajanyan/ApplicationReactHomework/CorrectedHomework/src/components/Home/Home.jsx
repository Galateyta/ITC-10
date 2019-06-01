import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap';
import './home.css'
import { connect } from 'react-redux';
import SideNav, { NavItem } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.signUpLocStorage = this.signUpLocStorage.bind(this);
    }

    signUpLocStorage() {
        this.props.dispatch({
            type: "ADD",
            user: {}
        });
        localStorage.removeItem("signUp");
        this.props.history.push('/');
    };

    render() {
        return (
            <div className='home-style'>
                <div className='left-container'>
                    <SideNav id="side-nave-id">
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem>
                                <div className='user-img-style'>
                                    <img src='https://image.flaticon.com/icons/png/512/149/149071.png' alt='img' />
                                </div>
                            </NavItem>
                            <NavItem>
                                <p>{this.props.user.name}</p>
                            </NavItem>
                            <NavItem>
                                <p>{this.props.user.surname}</p>
                            </NavItem>
                            <NavItem>
                                <p>{this.props.user.date}</p>
                            </NavItem>
                            <NavItem eventKey="home">
                                <NavLink to='/home'>Home</NavLink>
                            </NavItem>
                            <NavItem eventKey="about">
                                <NavLink to='/home/about'>About</NavLink>
                            </NavItem>
                            <NavItem eventKey="slider">
                                <NavLink to='/home/slider'>Slider</NavLink>
                            </NavItem>
                            <NavItem eventKey="table">
                                <NavLink to='/home/table'>Table</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button color='primary' onClick={this.signUpLocStorage}>
                                    Logout
                                    </Button>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                </div>
                <div className='right-container'>
                    {this.props.component}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { ...state };
  };
export default connect(mapStateToProps)(Home);
