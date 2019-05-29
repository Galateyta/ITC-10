import React, {Component} from 'react';
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Grid
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ExitIcon from '@material-ui/icons/ExitToApp';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    }
    this.user = this.props.currentUser;
    this.component = this.props.component;
  }

  toggleDrawer = (drawerOpen) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({drawerOpen});
  };

  ImageAvatar(url) {
    return (
      <Grid container justify="center" alignItems="center">
        <img
          width="82px"
          height="82px"
          alt="Remy Sharp"
          src="https://media.istockphoto.com/vectors/woman-icon-flat-single-avatarpeaople-icon-from-the-big-avatar-flat-vector-id1023960304?s=170x170"
          className="big-avatar"/>
      </Grid>
    );
  }

  sideList = () => (
    <div
      className="list"
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}>
      <div className="list-header">
        <this.ImageAvatar/>
        <h4>{this.user.name} {this.user.surname}</h4>
        <span className="login-text">{this.user.login}</span>
      </div>
      <Divider/>
      <List>
        {['Slider', 'About', 'Table'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0
                ? <InboxIcon/>
                : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        <ListItem button key="Log Out" onClick={this.props.logOut}>
          <ListItemIcon>
            <ExitIcon/>
          </ListItemIcon>
          <ListItemText primary="Log Out"/>
        </ListItem>

      </List>
    </div>
  );

  render() {
    return (
      <div>
        <Grid container direction="row">
          <Box ml={2} mt={1}>
            <IconButton
              color="default"
              aria-label="Open drawer"
              onClick={this.toggleDrawer(true)}
              edge="start">
              <MenuIcon/>
            </IconButton>
          </Box>
          {this.component ? this.component : null}
        </Grid>

        <SwipeableDrawer
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}>
          {this.sideList('left')}
        </SwipeableDrawer>
      </div>
    );
  }
}

export default Home;