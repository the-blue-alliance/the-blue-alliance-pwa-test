import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';


const styles = {
  subHeader: {
    backgroundColor: indigo[500],
  },
  subHeaderText: {
    color: '#fff',
  },
}


class EventsList extends PureComponent {
  render() {
    console.log("Render EventsList");

    var eventList = <CircularProgress color="accent" size={20} />
    if (this.props.events) {
      eventList = this.props.events.map(function(event){
        // TODO: reenable ListItem as button once touch ripple gets fixed. @fangeugene 2017-09-19
        // https://github.com/callemall/material-ui/issues/6729
        return (
          <ListItem divider key={event.key} component={Link} to={`/event/${event.key}`}>
            <ListItemText primary={event.short_name} secondary={`${event.city}, ${event.state_prov}, ${event.country} | ${event.start_date} - ${event.end_date}`} />
          </ListItem>
        )
      })
    }

    return (
      <List style={{padding: 0}}>
        <ListSubheader className={this.props.classes.subHeader}>
          <ListItemText primary="Type Label TODO" classes={{text: this.props.classes.subHeaderText}}/>
        </ListSubheader>
        {eventList}
      </List>
    );
  }
}

export default withStyles(styles)(EventsList);
