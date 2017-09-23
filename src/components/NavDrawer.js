import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import HomeIcon from 'material-ui-icons/Home';
import StarIcon from 'material-ui-icons/Star';
import VideocamIcon from 'material-ui-icons/Videocam';
import EventIcon from 'material-ui-icons/Event';
import PeopleIcon from 'material-ui-icons/People';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden'
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';
import TBAlogo from '../icons/tba_icon_blue.svg';

const DRAWER_WIDTH = 200  // TODO put in global constants
const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: DRAWER_WIDTH,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    height: '100px',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    height: '50%',
    margin: '0 10px',
  },
})

class NavDrawer extends PureComponent {
  render() {
    console.log("Render NavDrawer")

    const drawer = (
      <div>
        <div className={this.props.classes.drawerHeader}>
          <img src={TBAlogo} className={this.props.classes.logo} alt="logo" />
          <Typography type="title" color="inherit">
            The Blue Alliance
          </Typography>
        </div>
        <Divider />
        <List>
          <LinkContainer to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/">
            <ListItem button>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="myTBA" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/">
            <ListItem button>
              <ListItemIcon>
                <VideocamIcon />
              </ListItemIcon>
              <ListItemText primary="GameDay" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/events">
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </LinkContainer>
          <LinkContainer to="/teams">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Teams" />
            </ListItem>
          </LinkContainer>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Offline Only" />
            <ListItemSecondaryAction>
              <Switch
                onClick={this.props.toggleOffline}
                checked={this.props.offlineOnly}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    )

    return (
      <div className={this.props.classes.drawer}>
        <Hidden lgUp>
          <Drawer
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
            type="temporary"
            open={this.props.mobileOpen}
            onRequestClose={this.props.closeHandler}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden lgDown implementation="css">
          <Drawer
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
            type="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(NavDrawer);
