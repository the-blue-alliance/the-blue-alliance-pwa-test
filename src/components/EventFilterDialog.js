import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog'
import blue from 'material-ui/colors/blue'
import Checkbox from 'material-ui/Checkbox'

const styles = {
  listWrapper: {
    maxHeight: '100%',
    overflow: 'auto',
  },
}

class EventFilterDialog extends PureComponent {
  handleClose = () => {
    this.props.setPageState({ filterDialogOpen: false })
  }

  handleToggle = (district) => () => {
    let filters = this.props.districtFilters

    if (filters.has(district.get('key'))) {
      filters = filters.delete(district.get('key'))
    } else {
      filters = filters.add(district.get('key'))
    }

    this.props.setPageState({
      districtFilters: filters,
    })
  }

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.isOpen}>
        <DialogTitle>Filter Events</DialogTitle>
        <div className={this.props.classes.listWrapper}>
          <List>
            {this.props.districts.map(district =>{
              return (
                <ListItem key={district.get('key')} button onClick={this.handleToggle(district)}>
                  <Checkbox
                    checked={this.props.districtFilters.has(district.get('key'))}
                  />
                  <ListItemText primary={`${district.get('display_name')} District`} />
                </ListItem>
              )
            })}
          </List>
        </div>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Okay
          </Button>
          </DialogActions>
      </Dialog>
    )
  }
}

EventFilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
  districts: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventFilterDialog)
