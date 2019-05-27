import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

class Login extends Component {
  render() {
    return (<div className="login">
      <FormControl>
        <Grid container
        direction="column"
        justify="space-between">
        <TextField id="login" label="Login" margin="dense" type="text"/>
        <TextField id="password" label="Password" margin="dense" type="password"/>
        <FormControlLabel control={<Checkbox color = "primary" />} label="Remember me"/>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={1}
          >
      <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="outlined">
          Cancel
        </Button>
      </Grid>
      </Grid>
      </FormControl>
    </div>);
  }
}

export default Login;
