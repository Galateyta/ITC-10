import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux'
import allReducers from './reducers'

const store = createStore(allReducers);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Login/>
      </Provider>
    );
  }
}
