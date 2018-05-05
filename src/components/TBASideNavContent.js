import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import VideocamIcon from '@material-ui/icons/Videocam';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root:  {
    marginTop: 64,
    overflowY: 'auto',
  }
})

class TBASideNavContent extends PureComponent {
  render() {
    console.log("Render TBASideNavContent")

    return (
      <div className={this.props.classes.root} >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/mytba">
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="myTBA" />
          </ListItem>
          <ListItem button component={Link} to="/gameday">
            <ListItemIcon>
              <VideocamIcon />
            </ListItemIcon>
            <ListItemText primary="GameDay" />
          </ListItem>
          <ListItem button component={Link} to="/events">
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button component={Link} to="/teams">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary={this.props.apiEnabled ? "API Enabled" : "API Disabled"} />
            <ListItemSecondaryAction>
              <Switch
                onClick={this.props.toggleAPI}
                checked={this.props.apiEnabled}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={this.props.idbEnabled ? "IDB Enabled" : "IDB Disabled"} />
            <ListItemSecondaryAction>
              <Switch
                onClick={this.props.toggleIDB}
                checked={this.props.idbEnabled}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(TBASideNavContent);
