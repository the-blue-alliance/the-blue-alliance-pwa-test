import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import StickySectionHeader from './StickySectionHeader'
import EventListItemContainer from '../containers/EventListItemContainer'

const styles = theme => ({
  eventListCard: {
    marginBottom: theme.spacing.unit*2,
  },
})

class EventListCard extends PureComponent {
  render() {
    console.log("Render EventListCard")

    const { classes, events, label } = this.props

    return (
      <Paper className={classes.eventListCard}>
        <StickySectionHeader
          label={
            <React.Fragment>
              <Typography variant='h6'>{label}</Typography>
              <Typography variant='caption'>{events.size} Events</Typography>
            </React.Fragment>
          }
        />
        {events.map(event => {
          return <EventListItemContainer key={event.key} event={event}/>
        })}
      </Paper>
    )
  }
}

EventListCard.propTypes = {
  classes: PropTypes.object.isRequired,
  events: ImmutablePropTypes.list,
  label: PropTypes.string.isRequired,
}

export default withStyles(styles)(EventListCard)
