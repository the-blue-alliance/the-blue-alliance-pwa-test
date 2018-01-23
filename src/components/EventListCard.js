import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

import Paper from 'material-ui/Paper'

const styles = theme => ({
  eventListCard: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
})

class EventListCard extends PureComponent {
  render() {
    console.log("Render EventListCard")

    return (
      <Paper className={this.props.classes.eventListCard} elevation={4}>
        {this.props.events.map(event => {
          return <div key={event.key}><Link to={`/event/${event.key}`}>{event.name}</Link></div>
        })}
      </Paper>
    )
  }
}

EventListCard.propTypes = {
  classes: PropTypes.object.isRequired,
  events: ImmutablePropTypes.list,
}

export default withStyles(styles)(EventListCard)
