import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'
import { Map, Set } from 'immutable'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'

import EventFilterChip from './EventFilterChip'
import { districtColors } from '../utils'

const styles = theme => ({
  title: {
    margin: theme.spacing.unit,
  },
  clearButton: {
    margin: theme.spacing.unit,
  },
})

// Fake district for filtering regionals
const regional = Map({
  key: 'regional',
})

class EventFilter extends PureComponent {
  handleClear = () => {
    this.props.setPageState({
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
    const { classes, theme } = this.props

    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }

    return (
      <React.Fragment>
        <Typography variant='title' className={classes.title}>Filters</Typography>
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
        <Zoom
          in={this.props.districtFilters.size !== 0}
          timeout={transitionDuration}
        >
          <Button variant='outlined' className={classes.clearButton} onClick={this.handleClear}>
            Clear Filters
          </Button>
        </Zoom>
      </React.Fragment>
    )
  }
}

EventFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
  districts: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles, { withTheme: true })(EventFilter)
