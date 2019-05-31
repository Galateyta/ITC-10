import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import About from './Components/About';
import Homer from './Components/Home';
import Slier from './Components/Slider';
import Table from './Components/Table';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux'
import allReducers from './reducers/index'

const store = createStore(allReducers);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Register/>
      </Provider>
    );
  }
}
