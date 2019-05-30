import React, {Component} from 'react';
import { Nav, NavItem, Container} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import './home.css'
import Slider from '../Slider/Slider.jsx'
import About from '../About/About.jsx'
import MyTable from '../Table/Table.jsx'
import { BrowserRouter, Route} from 'react-router-dom';

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
    }
        render() {
          return (
            <BrowserRouter>
              <Container >
                  <div className = 'home-style'>
                      <div className = 'left-container'>
                          <div className = 'user-style'>
                              <img src = 'https://image.flaticon.com/icons/png/512/149/149071.png' alt = 'img'/>
                              <p>{this.state.name}</p>
                              <p>{this.state.surname}</p>
                              <p>{this.state.date}</p>
                          </div>
                          <div className = 'nav-style'>
                             <Nav vertical>
                                 <NavItem>
                                     <NavLink to = '/home/slider'>Slider</NavLink>
                                     <hr/>
                                 </NavItem>
                                 <NavItem>
                                     <NavLink to = '/home/about'>About</NavLink>
                                     <hr/>
                                 </NavItem>
                                 <NavItem>
                                     <NavLink to = '/home/table'>Table</NavLink>
                                     <hr/>
                                 </NavItem>
                                 <NavItem>
                                    <NavLink to = '/'>logout</NavLink>
                                 </NavItem>
                             </Nav>
                          </div>
                      </div>
                      <div className = 'right-container'>
                        <Route path = '/home/slider' exact component = {Slider}/>
                        <Route path = '/home/about' exact component = {About}/>
                        <Route path = '/home/table' exact component = {MyTable}/>
                      </div>
                  </div>
              </Container>
              </BrowserRouter>
     );
    }

}
export default Home;
