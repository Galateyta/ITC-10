import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {updateAction} from "./actions/updateAction"
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Table from './components/table/Table';

class App extends Component {
  state = {
    isAuthed: false, //false
    users: [
      {
        login: 'admin',
        password: 'admin123',
        name: 'Admin',
        surname: 'Adminich',
        dateOfBirthday: Date('19/03/1999'),
        gender: 'male',
        image: ''
      }
    ],
    currentUser: {
      login: 'admin',
      password: 'admin123',
      name: 'Admin',
      surname: 'Adminich',
      dateOfBirthday: Date('19/03/1999'),
      gender: 'male',
      image: ''
    }
  }

  checkUser = (currentUser) => {
    const users = this.state.users;
    for (const user of users) {
      if (user.login === currentUser.login && user.password === currentUser.password) {
        this.setState({isAuthed: true, currentUser: user});
        return true;
      }
    }
    this.setState({isAuthed: false, currentUser: {}});
    return false;
  }

  addUser = (newUser) => {
    const newUsers = this.state.users;
    newUsers.push(newUser);
    this.setState({users: newUsers});
  }

  logOut = () => {
    console.log('log out')
    this.setState({isAuthed: false, currentUser: {}});
  }

  render() {
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
            render={(props) => <Home
            {...props}
            isAuthed={this.state.isAuthed}
            currentUser={this.state.currentUser}
            logOut={this.logOut}/>}/>
          <Route
            path='/slider'
            render={(props) => <Home
            {...props}
            isAuthed={this.state.isAuthed}
            currentUser={this.state.currentUser}
            logOut={this.logOut}/>}/>
          <Route
            path='/about'
            render={(props) => <Home
            {...props}
            isAuthed={this.state.isAuthed}
            currentUser={this.state.currentUser}
            logOut={this.logOut}/>}/>
          <Route
            path='/table'
            render={(props) => <Home
            {...props}
            isAuthed={this.state.isAuthed}
            currentUser={this.state.currentUser}
            logOut={this.logOut}
            component={< Table addUser = {
            this.addUser
          } />}/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  updateAction: () => dispatch(updateAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);