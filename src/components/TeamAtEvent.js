// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

// TBA Components
import TeamEventMatchListContainer from '../containers/TeamEventMatchListContainer'
import TeamAtEventResultsContainer from '../containers/TeamAtEventResultsContainer'

const styles = theme => ({
})

class TeamAtEvent extends PureComponent {
  render() {
    console.log("Render TeamAtEvent")
    const { hideEventName, event, teamKey } = this.props

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={4}>
          {!hideEventName && <React.Fragment>
            <Typography variant='title' gutterBottom>
              <Link to={`/event/${event.key}`}>{event.name}</Link>
            </Typography>
            <Typography variant='caption' gutterBottom>
              {event.getDateString()}
            </Typography>
          </React.Fragment>}
          <TeamAtEventResultsContainer
            teamKey={teamKey}
            eventKey={event.key}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TeamEventMatchListContainer
            teamKey={teamKey}
            eventKey={event.key}
          />
        </Grid>
      </Grid>
    )
  }
}

TeamAtEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  hideEventName: PropTypes.bool,
}

export default withStyles(styles)(TeamAtEvent)
