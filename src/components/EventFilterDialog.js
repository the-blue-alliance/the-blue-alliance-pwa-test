import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  avatar: {
    background: blue[100],
    color: blue[600],
  },
  listWrapper: {
    maxHeight: '100%',
    overflow: 'auto',
  },
};

class EventFilterDialog extends Component {
  state = {
    checked: [],
  };

  handleRequestClose = () => {
    this.props.onRequestClose();
  };

  render() {
    let filterNames = []
    for (let label in this.props.eventFilters) {
      filterNames.push(label)
    }
    filterNames.sort()

    const listItems = filterNames.map((name, i) =>{
      return (
        <ListItem button onClick={this.props.handleToggle(this.props.eventFilters[name])} key={i}>
          <Checkbox
            checked={this.props.activeFilters.indexOf(this.props.eventFilters[name]) !== -1}
            disableRipple
          />
          <ListItemText primary={`${name} District`} />
        </ListItem>
      )
    })

    return (
      <Dialog onRequestClose={this.handleRequestClose} open={this.props.open}>
        <DialogTitle>Filter Events</DialogTitle>
        <div className={this.props.classes.listWrapper}>
          <List>
            {listItems}
          </List>
        </div>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Okay
          </Button>
          </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EventFilterDialog);
