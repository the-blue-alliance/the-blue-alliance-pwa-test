import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'
import { Map, Set } from 'immutable'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Divider from '@material-ui/core/Divider'

import EventFilterChip from './EventFilterChip'
import { districtColors } from '../utils'

const styles = theme => ({
  listWrapper: {
    maxHeight: '100%',
    overflow: 'auto',
  },
})

// Fake district for filtering regionals
const regional = Map({
  key: 'regional',
})

class EventFilterDialog extends PureComponent {
  handleClose = () => {
    this.props.setPageState({ filterDialogOpen: false })
  }

  handleClear = () => {
    this.props.setPageState({
      filterDialogOpen: false,
      districtFilters: Set(),
    })
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
      <Dialog onClose={this.handleClose} open={this.props.isOpen} maxWidth='md'>
        <DialogTitle>Filter Events</DialogTitle>
        <Divider />
        <div>
          <EventFilterChip
            label='Regionals'
            color={districtColors['regional']}
            selected={this.props.districtFilters.has(regional.get('key'))}
            onClick={this.handleToggle(regional)}
          />
          {this.props.districts.map(district => {
            return (
              <EventFilterChip
                key={district.get('key')}
                label={`${district.get('abbreviation').toUpperCase()} District`}
                color={districtColors[district.get('abbreviation')]}
                selected={this.props.districtFilters.has(district.get('key'))}
                onClick={this.handleToggle(district)}
              />
            )
          })}
        </div>
        <Divider />
        <DialogActions>
          <Button onClick={this.handleClear} color='primary'>
            Clear filters
          </Button>
          <Button onClick={this.handleClose} color='primary' autoFocus>
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
