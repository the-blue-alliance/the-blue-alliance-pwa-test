import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
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
    checked: [0, 1, 2],
  };

  handleRequestClose = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, onRequestClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>Filter Events</DialogTitle>
        <div className={classes.listWrapper}>
          <List>
            <ListItem button onClick={this.handleToggle(0)}>
              <Checkbox
                checked={this.state.checked.indexOf(0) !== -1}
                disableRipple
              />
              <ListItemText primary="Regionals" />
            </ListItem>
            <ListItem button onClick={this.handleToggle(1)}>
              <Checkbox
                checked={this.state.checked.indexOf(1) !== -1}
                disableRipple
              />
              <ListItemText primary="Michigan District" />
            </ListItem>
            <ListItem button onClick={this.handleToggle(2)}>
              <Checkbox
                checked={this.state.checked.indexOf(2) !== -1}
                disableRipple
              />
              <ListItemText primary="Pacific Northwest District" />
            </ListItem>
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

EventFilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(EventFilterDialog);
