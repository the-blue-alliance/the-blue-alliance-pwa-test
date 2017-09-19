import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';


class EventsList extends PureComponent {
  render() {
    console.log("Render EventsList");

    var eventList = <CircularProgress color="accent" size={20} />
    const week = this.props.week
    if (this.props.events) {
      eventList = this.props.events.map(function(event){
        if (event.week === week) {
          return (
            <ListItem button divider key={event.key} component={Link} to={`/event/${event.key}`}>
              <ListItemText primary={event.short_name} secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
            </ListItem>
          )
        }
      })
    }

    return (
      <List style={{padding: 0}}>
        <ListSubheader>
          <ListItemText primary="Regional Events" />
        </ListSubheader>
        {eventList}
      </List>
    );
  }
}

export default EventsList;
