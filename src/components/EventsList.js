import React, { PureComponent } from 'react';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';


class EventsList extends PureComponent {
  render() {
    console.log("Render EventsList");
    if (this.props.temp === "1") {
      return (
        <List style={{padding: 0}}>
          <ListSubheader>
            <ListItemText primary="Regional Events" />
          </ListSubheader>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListSubheader>
            <ListItemText primary="Michigan District Events" />
          </ListSubheader>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Lake Superior" secondary="Duluth, MN, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
        </List>
      );
    } else {
      return (
        <List style={{padding: 0}}>
          <ListSubheader>
            <ListItemText primary="Regional Events" />
          </ListSubheader>
          <ListItem button divider>
            <ListItemText primary="Hub City" secondary="Lubbock, Tx, USA Mar 1 to Mar 4, 2017" />
          </ListItem>
        </List>
      );
    }
  }
}


export default EventsList;
