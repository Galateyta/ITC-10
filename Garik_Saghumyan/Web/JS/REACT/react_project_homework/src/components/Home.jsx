import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Slider from './Slider';
import About from './About';
import Table from './Table';
import Navbar from './Navbar';
import {Container} from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Container>
              <Route path='/slider' component={Slider}/>
              <Route path='/about' component={About}/>
              <Route path='/table' component={Table}/>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}
export default Home;