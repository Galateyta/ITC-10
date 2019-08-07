import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Slider from './components/slider/Slider';
import About from './components/about/About';
import Table from './components/table/Table';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path='/login' render={(props) => <Login {...props}/>}/>
          <Route path='/register' render={(props) => <Register {...props}/>}/>
          <Route path='/' exact render={(props) => <Home {...props}/>}/>
          <Route path='/slider' render={(props) => <Home {...props} component={< Slider />}/>}/>
          <Route path='/about' render={(props) => <Home {...props} component={< About />}/> }/>
          <Route
            path='/table'
            render={(props) => <Home {...props} component={< Table />}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;