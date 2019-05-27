import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'
import './App.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route path="/login" component={Login}/>
          <Route path="/home" component={Home}/>
      </BrowserRouter>
    );
  }
}
export default App;
