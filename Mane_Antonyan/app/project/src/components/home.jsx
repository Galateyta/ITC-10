import React, {Component} from 'react';
import { Nav } from 'reactstrap';
import './home.module.css';

import Slider from './slider.jsx';
import About from './user.jsx';
import Table from './table.jsx';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            name: '',
            surname: '',
            pass: '',
            date: ''
        };
    }
        
    render() {
        return (
            <div className = 'home-style'>
                <div className = 'left-container'>
                    <div className = 'user-style'>
                    <img src="https://www.sccpre.cat/mypng/full/279-2790385_female-black-mom-icon-png.png"
                        alt="This is user default picture"/>
                    <p>{this.state.name}</p>
                    <p>{this.state.surname}</p>
                    <p>{this.state.date}</p>
                </div>
                </div>
                    <div className = 'navBar'>
                    <Nav vertical>                    
                        <Nav.Item>
                            <Nav.Link to="/home/slider">Slider</Nav.Link>
                        </Nav.Item>
                    
                        <Nav.Item>
                            <Nav.Link to="/home/user">User</Nav.Link>
                        </Nav.Item>
                    
                        <Nav.Item>
                            <Nav.Link to="/home/table">Table</Nav.Link>
                        </Nav.Item>
                    
                        <Nav.Item>
                            <Nav.Link to="/">Sign out</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="right-container">
                    {this.props.component}
                </div>
            </div>
        );
    }
}

export default Home;