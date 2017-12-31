import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { withStyles } from 'material-ui/styles';
import HomeIcon from 'material-ui-icons/Home';
import StarIcon from 'material-ui-icons/Star';
import VideocamIcon from 'material-ui-icons/Videocam';
import EventIcon from 'material-ui-icons/Event';
import PeopleIcon from 'material-ui-icons/People';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root:  {
    marginTop: 64,
  }
})

class TBASideNavContent extends PureComponent {
  render() {
    console.log("Render TBASideNavContent")

    return (
      <div className={this.props.classes.root} >
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

export default withStyles(styles)(TBASideNavContent);
