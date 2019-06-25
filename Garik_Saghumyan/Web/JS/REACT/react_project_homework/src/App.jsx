import React, { Component } from 'react';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';
import Table from './components/Table';
import Slider from './components/Slider'
import Login from './components/Login';
import About from './components/About'
import Home from './components/Home'
import Register from './components/Register'
import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path='/home' exact render={(props) => localStorage['islogin'] ? <Home {...props} /> : <Redirect to='/' />} />
        <Route path='/home/table'
          render={(props) => localStorage['islogin'] ? <Home {...props} component={< Table />} /> : <Redirect to='/' />} />
        <Route path='/home/slider'
          render={(props) => localStorage['islogin'] ? <Home {...props} component={< Slider />} /> : <Redirect to='/' />} />
        <Route path='/home/about'
          render={(props) => localStorage['islogin'] ? <Home {...props} component={< About />} /> : <Redirect to='/' />} />
      </BrowserRouter>
    );
  }
}
export default App;
