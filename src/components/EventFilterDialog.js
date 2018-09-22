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
import TextField from '@material-ui/core/TextField'
import FilterListIcon from '@material-ui/icons/FilterList'

import EventFilterChip from './EventFilterChip'
import HideableBadge from './HideableBadge'
import { districtColors } from '../utils'

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: 56 + theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      display: 'none',
      bottom: theme.spacing.unit * 4,
      right: theme.spacing.unit * 4,
    },
    zIndex: theme.zIndex.appBar,
  },
  textContainer: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    width: '100%',
  },
  chipContainer: {
    overflowY: 'auto',
  },
})

// Fake district for filtering regionals
const regional = Map({
  key: 'regional',
})

class EventFilterDialog extends PureComponent {
  state = {
    open: false,
  }

  constructor(props) {
    super(props)
    this.locationInput = React.createRef()
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleClear = () => {
    this.locationInput.current.value = ''
    requestAnimationFrame(() => this.props.setPageState({
      locationFilter: '',
      districtFilters: Set(),
    }))
    this.handleClose()
  }

  handleToggle = (district) => () => {
    let filters = this.props.districtFilters

    if (filters.has(district.get('key'))) {
      filters = filters.delete(district.get('key'))
    } else {
      filters = filters.add(district.get('key'))
    }

    requestAnimationFrame(() => this.props.setPageState({
      districtFilters: filters,
    }))
  }

  handleLocationFilter = (event) => {
    const location = event.target.value
    requestAnimationFrame(() => this.props.setPageState({
      locationFilter: location,
    }))
  }

  render() {
    const { classes, districts, districtFilters, locationFilter } = this.props
    const filterCount = (locationFilter === '' ? 0 : 1) + (districtFilters ? districtFilters.size : 0)

    return (
      <React.Fragment>
        <Button
          variant='fab'
          className={classes.fab}
          color='secondary'
          onClick={this.handleOpen}
        >
          <HideableBadge
            badgeContent={filterCount}
            color='error'
            hidden={filterCount === 0}
            style={{height: 24, width: 24}}
          >
            <FilterListIcon/>
          </HideableBadge>
        </Button>
        <Dialog onClose={this.handleClose} open={this.state.open} maxWidth='md'>
          <DialogTitle>Filter Events</DialogTitle>
          <Divider />
          <div className={classes.textContainer}>
            <TextField
              inputRef={this.locationInput}
              label='Location'
              className={classes.textField}
              defaultValue={locationFilter}
              onChange={this.handleLocationFilter}
              margin='normal'
            />
          </div>
          <Divider />
          <div className={classes.chipContainer}>
            <EventFilterChip
              label='Regionals'
              color={districtColors['regional']}
              selected={districtFilters && districtFilters.has(regional.get('key'))}
              onClick={this.handleToggle(regional)}
            />
            {districts.map(district => {
              return (
                <EventFilterChip
                  key={district.get('key')}
                  label={`${district.get('abbreviation').toUpperCase()} District`}
                  color={districtColors[district.get('abbreviation')]}
                  selected={districtFilters && districtFilters.has(district.get('key'))}
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
      </React.Fragment>
    )
  }
}

EventFilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  districts: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventFilterDialog)
