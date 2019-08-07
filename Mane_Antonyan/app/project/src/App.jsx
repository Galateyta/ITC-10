import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Registration from './components/registration.jsx';
import Slider from './components/slider.jsx';
import User from './components/user.jsx';
import Table from './components/table.jsx';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path = '/' exact component = {Login} />
        <Route path = '/registration' exact component = {Registration} />
        <Route path = '/home' exact component = {Home} />
        <Route path='/home/table' render = { (props) => <Home {...props} component={ <Table/> }/> } />
        <Route path='/home/slider' render = { (props) => <Home {...props} component={ < Slider/> }/>} />
        <Route path='/home/user' render = { (props) => <Home {...props} component={< User/> }/>} />
      </BrowserRouter>
    );
  }
}

export default App;