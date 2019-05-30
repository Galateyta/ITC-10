import React, { Component } from 'react';
import { Nav, NavItem, Container, Row, Col } from 'reactstrap';
import style from './Home.module.css'
import { Redirect, NavLink, BrowserRouter, Route } from 'react-router-dom'
import Slider from '../Slider/Slider';
import About from '../About/About';
import Login from '../../Login/Login';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'anun',
      surname: 'azganun',
      email: 'username@mail.ru',
      password: 'password'
    };

  }
  render() {

    return (
      <BrowserRouter>
      <Container>
        <div className={style.home}>
          <div className={style.leftContainer}>
            <div className= {style.userStyle}>
            <img src='https://placeimg.com/640/480/people?t=1559044767799' alt='img' />
            <p>{this.state.name}</p>
            <p>{this.state.surname}</p>
            <p>{this.state.date}</p>
            </div>
            <div className={style.navStyle}>
              <Nav vertical>
                
                  <NavLink to='/home/slider'>Slider</NavLink>
                  <hr/>
                  <NavLink to='/home/about'>About</NavLink>
                  <hr />
                
                  <NavLink to='/home/table'>Table</NavLink>
                  <hr />

                  <a href='/'>logout</a>
               
              </Nav>
            </div>
          </div>
          <div className={style.rightContainer}>
          <Route path='/home/slider' exact component={Slider} />
          <Route path='/home/about' exact component={About} />

                  </div>

        </div>
        </Container>
      </BrowserRouter>
    );
  }

}
export default Home;
