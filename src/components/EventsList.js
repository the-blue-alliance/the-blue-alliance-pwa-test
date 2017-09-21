import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { AutoSizer, List } from 'react-virtualized';
import { withStyles } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import { ListItem, ListItemText, ListSubheader } from 'material-ui/List';


const styles = {
  subHeader: {
    backgroundColor: indigo[500],
  },
  subHeaderText: {
    color: '#fff',
  },
}


class EventsList extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.events.size !== nextProps.events.size) {
      return true;
    }
    return false;
  }


  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const classes = this.props.classes
    if (index === 0) {
      return (
        <div key={'label0'} style={style}>
          <ListSubheader className={classes.subHeader}>
            <ListItemText primary="Type Label TODO" classes={{text: classes.subHeaderText}}/>
          </ListSubheader>
        </div>
      )
    } else {
      const event = this.props.events.get(index).toJS()
      return (
        <div key={event.key} style={style}>
          <ListItem divider component={Link} to={`/event/${event.key}`}>
            <ListItemText primary={event.short_name} secondary={`${event.city}, ${event.state_prov}, ${event.country} | ${event.start_date} - ${event.end_date}`} />
          </ListItem>
        </div>
      )
    }
  }



  render() {
    console.log("Render EventsList")

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={this.props.events.size}
            rowHeight={({ index }) => index === 0 ? 24 : 70}
            rowRenderer={this.rowRenderer}
          />
        )}
      </AutoSizer>
    );
  }
}

export default withStyles(styles)(EventsList);
