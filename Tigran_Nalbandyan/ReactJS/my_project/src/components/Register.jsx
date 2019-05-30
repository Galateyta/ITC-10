import React, {Component} from 'react';
import {
  Button,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  FormControlLabel
} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import users from '../data/users';

class Register extends Component {
  state = {
    login: '',
    password: '',
    name: '',
    dateOfBirthday: Date.now(),
    gender: 'male',
    image: ''
  }

  addUser = (newUser) => {
    users.push(newUser);
  }

  handleDateChange = (date) => {
    this.setState({dateOfBirthday: date});
  }

  handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    // console.log(name, e.target.files[0].name )
    if (name === 'login') {
      this.setState({login: value});
    } else if (name === 'password') {
      this.setState({password: value});
    } else if (name === 'name') {
      this.setState({name: value});
    } else if (name === 'surname') {
      this.setState({surname: value});
    } else if (e.target.type === 'radio') {
      this.setState({gender: value});
    } else if (name === 'image') {
      this.setState({image: value});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = Object.assign(this.state);
    this.addUser(newUser);
    this
      .props
      .history
      .push('/');
  }

  render() {
    console.log(this.props.isAuthed);
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="column" justify="space-between">
            <TextField
              id="name"
              onChange={this.handleChange}
              label="Name"
              margin="dense"
              type="text"
              required/>
            <TextField
              id="surname"
              onChange={this.handleChange}
              label="Surname"
              name="surname"
              margin="dense"
              type="text"
              required/>
            <TextField
              id="login"
              onChange={this.handleChange}
              label="Login"
              margin="dense"
              type="text"
              required/>
            <TextField
              id="password"
              onChange={this.handleChange}
              label="Password"
              margin="dense"
              type="password"
              required/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                label="Date picker"
                value={this.state.dateOfBirthday}
                onChange={this.handleDateChange}/>
            </MuiPickersUtilsProvider>
            <Grid container direction="row">
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="Gender"
                  id="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}>
                  <FormControlLabel
                    value="male"
                    control={< Radio color = "primary" />}
                    label="Male"/>
                  <FormControlLabel
                    value="female"
                    control={< Radio color = "primary" />}
                    label="Female"/>
                </RadioGroup>
              </FormControl>
              <Grid container direction="column" alignItems="center" xs={6}>
                <input
                  id="image"
                  value={this.state.image}
                  onChange={this.handleChange}
                  accept="image/*"
                  type="file"
                  hidden/>
                <label htmlFor="image">
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
                <img src={this.state.image} alt="avatar"/>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="space-evenly" alignItems="center">
              <Button variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
              <Button
                onClick={() => {
                this
                  .props
                  .history
                  .push('/login');
              }}
                variant="outlined">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Register;
