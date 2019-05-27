import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <Nav vertical >
                    <NavItem>
                        <NavLink to="/slider">Slider</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/table">Table</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/logut">Logout</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}
export default Navbar;