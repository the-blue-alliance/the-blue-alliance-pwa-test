import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import SectionHeaderWithScrollto from './SectionHeaderWithScrollto'
import EventListItemContainer from '../containers/EventListItemContainer'

const styles = theme => ({
  eventListCard: {
    marginBottom: theme.spacing.unit*2,
  },
})

class EventListCard extends PureComponent {
  render() {
    console.log("Render EventListCard")

    const { classes, events, label, sections, sectionKey } = this.props

    return (
      <Paper className={classes.eventListCard}>
        <SectionHeaderWithScrollto
          label={
            <React.Fragment>
              <Typography variant='title'>{label}</Typography>
              <Typography variant='caption'>{events.size} Events</Typography>
            </React.Fragment>
          }
          sections={sections}
          sectionKey={sectionKey}
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
