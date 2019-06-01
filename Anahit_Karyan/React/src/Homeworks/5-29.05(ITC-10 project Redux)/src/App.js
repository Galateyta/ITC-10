import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import About from './Components/About';
import Home from './Components/Home';
import Slider from './Components/Slider';
import TableSection from './Components/Table/TableSection';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux'
import allReducers from './reducers/index'

const store = createStore(allReducers);

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Provider store={store}>
           <Route path='/' exact component={Register}/>
           <Route path='/login' component={Login}  />
           <Route path='/home' component={Home}/>
           <Route path="/home/slider" exact component={Slider} />
           <Route path="/home/about" component={About} />
           <Route path="/home/table" component={TableSection} />
        </Provider>
      </Router>
    );
  }
}
