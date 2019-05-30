import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import Login from './Login';
import Slider from './Slider';
import About from './About';
import Table from './Table';
import { Nav, NavItem, Container, Jumbotron } from 'reactstrap';
import home from './Home.module.css'
import data from '../data'
class Home extends Component {
  state = {
    name: '',
    surname: '',
    email: '',
    image: '',
    gender: 'male',
    birthday: new Date()
  }

  render() {
    return (
      <BrowserRouter>
        <Jumbotron className="d-flex justify-content-center">
          <Nav className={home.Nav} vertical >
          <NavItem className={home.NavItem}>
              <img src={data.map((user) => user.imagePath)}></img>            
              <p>{data.map((user) => user.name)}</p>
              <p>{data.map((user) => user.surname)}</p>
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
              <NavLink className={home.NavLink} to="/login">Logout</NavLink>
            </NavItem>
          </Nav>
          <Container >
            <Route path='/slider' component={Slider}/>
            <Route path='/about' component={About} />
            <Route path='/table' component={Table} />
            <Route path="/login" component={Login}/>
          </Container>
        </Jumbotron>

      </BrowserRouter>
    );
  }
}
export default Home;