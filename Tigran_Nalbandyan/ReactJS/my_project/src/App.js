import React, {Component} from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Table from './components/table/MyTable.jsx';

class App extends Component {
  state = {
    isAuthed: true, //false
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
            render={(props) => this.state.isAuthed
            ? <Home {...props} currentUser={this.state.currentUser} logOut={this.logOut} component={<Table addUser={this.addUser}/>} />
            : <Login {...props} checkUser={this.checkUser} />}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
