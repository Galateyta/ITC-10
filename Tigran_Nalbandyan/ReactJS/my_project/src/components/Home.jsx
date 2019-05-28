import React, {Component} from 'react';
import {
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({open});
  };

  sideList = side => (
    <div
      className="list"
      role="presentation"
      onClick={this.toggleDrawer(false)}
      onKeyDown={this.toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
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
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0
                ? <InboxIcon/>
                : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    return (
      <div>
        <Box ml={2} mt={1}>
          <IconButton
            color="black"
            aria-label="Open drawer"
            onClick={this.toggleDrawer(true)}
            edge="start">
            <MenuIcon/>
          </IconButton>
        </Box>

        <SwipeableDrawer
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}>
          {this.sideList('left')}
        </SwipeableDrawer>
      </div>
    );
  }
}

export default Home;