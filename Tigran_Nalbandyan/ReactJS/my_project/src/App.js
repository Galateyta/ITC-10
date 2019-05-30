import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {updateAction} from "./actions/updateAction"
import {bindActionCreators} from 'redux';
import users from './data/users';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Table from './components/table/Table';

class App extends Component {
  state = {
    users: users
  }

  checkUser = (currentUser) => {
    const users = this.state.users;
    for (const user of users) {
      if (user.login === currentUser.login && user.password === currentUser.password) {
        this
          .props
          .updateAction(user, true);
        return true;
      }
    }
    this
      .props
      .updateAction({}, false);
    return false;
  }

  addUser = (newUser) => {
    const newUsers = this.state.users;
    newUsers.push(newUser);
    this.setState({users: newUsers});
  }

  logOut = () => {
    this
      .props
      .updateAction({}, false);
  }

  render() {
    console.log('auth', this.props.isAuthed);

    return (
      <BrowserRouter>
        <div className="App">
          <Route
            path='/login'
            render={(props) => <Login {...props} checkUser={this.checkUser}/>}/>
          <Route
            path='/register'
            render={(props) => <Register {...props} addUser={this.addUser}/>}/>
          <Route
            path='/'
            exact
            render={(props) => <Home {...props} logOut={this.logOut}/>}/>
          <Route
            path='/slider'
            render={(props) => <Home {...props} logOut={this.logOut}/>}/>
          <Route
            path='/about'
            render={(props) => <Home {...props} logOut={this.logOut}/>}/>
          <Route
            path='/table'
            render={(props) => <Home
            {...props}
            logOut={this.logOut}
            component={< Table addUser = {
            this.addUser
          } />}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {currentUser: state.currentUser, isAuthed: state.isAuthed}
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);