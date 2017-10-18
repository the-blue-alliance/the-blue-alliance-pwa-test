import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';


const years = ['2017', '2016', '2015'];

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

class YearPickerDialog extends PureComponent {
  handleRequestClose = () => {
    this.props.onRequestClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onRequestClose(value);
  };

  render() {
    const { classes, onRequestClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>Select Year</DialogTitle>
        <div className={classes.listWrapper}>
          <List>
            {years.map(year =>
              <ListItem button onClick={() => this.handleListItemClick(year)} key={year}>
                <ListItemText primary={year} />
              </ListItem>,
            )}
          </List>
        </div>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          </DialogActions>
      </Dialog>
    );
  }
}

YearPickerDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(YearPickerDialog);
