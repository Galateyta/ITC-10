import React, {Component} from 'react';
import {Button, Grid, Checkbox, FormControlLabel, TextField} from '@material-ui/core';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    login: '',
    password: ''
  }
// TODO
  // componentWillMount() {
  //   if (!this.props.isAuthed) {
  //     this.props.history.push('/login')
  //   }
  // }

  handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    if (name === 'login') {
      this.setState({login: value});
    } else if (name === 'password') {
      this.setState({password: value});
    }
  }

  checkSignIn = (e) => {
    e.preventDefault();
    const currentUser = {
      login: this.state.login,
      password: this.state.password
    };
    if (this.props.checkUser(currentUser)) {
      this
        .props
        .history
        .push('/');
    }
  }

  render() {
    if (this.props.isAuthed) {
      this.props.history.push('/')
    }
    return (
      <div className="login">
        <form onSubmit={this.checkSignIn}>
          <Grid container direction="column" justify="space-between">
            <TextField
              id="login"
              label="Login"
              onChange={this.handleChange}
              margin="dense"
              type="text"
              required/>
            <TextField
              id="password"
              label="Password"
              onChange={this.handleChange}
              margin="dense"
              type="password"
              required/>
            <FormControlLabel
              control={< Checkbox color = "primary" />}
              label="Remember me"/>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
              spacing={1}>
              <Button
                variant="contained"
                color="primary"
                type="submit">
                Sign in
              </Button>
              <Button
                onClick={() => {
                this
                  .props
                  .history
                  .push('/register');
              }}
                variant="outlined">
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {currentUser: state.currentUser, isAuthed: state.isAuthed}
};


export default connect(mapStateToProps)(Login);