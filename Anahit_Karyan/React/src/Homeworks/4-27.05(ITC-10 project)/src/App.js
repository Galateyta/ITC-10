import React from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      name: '',
      surname: '',
      date: '',
      gemus: '',
      loginOrRegister: true,
      homeSection: 1
    };
  }
  cancellInRegister() {
    this.setState({loginOrRegister: true});
  }
  registerInLogin() {
  //  this.setState({loginOrRegister: false});
  return alert('aa')
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
              <Switch>

                  {this.state.loginOrRegister === true ? <Route exact path="/" component={() => <Login cancellInRegister={this.registerInLogin.bind(this)} />} /> : <Route exact path="/" component={() => <Register cancellInRegister={this.cancellInRegister.bind(this)} />} />}
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
