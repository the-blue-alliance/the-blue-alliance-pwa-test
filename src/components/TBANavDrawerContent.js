import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import HomeIcon from 'material-ui-icons/Home';
import StarIcon from 'material-ui-icons/Star';
import VideocamIcon from 'material-ui-icons/Videocam';
import EventIcon from 'material-ui-icons/Event';
import PeopleIcon from 'material-ui-icons/People';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';
import TBAlogo from '../icons/tba_icon_blue.svg';

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    height: '100px',
  },
  logo: {
    height: '50%',
    margin: '0 10px',
  },
})

class TBANavDrawerContent extends PureComponent {
  render() {
    console.log("Render TBANavDrawerContent")

    return (
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
  }
}

export default withStyles(styles)(TBANavDrawerContent);
