// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

// TBA Components
import MatchListContainer from '../containers/MatchListContainer'
import TeamEventResults from '../components/TeamEventResults'

const styles = theme => ({
})

class TeamAtEvent extends PureComponent {
  render() {
    console.log("Render TeamAtEvent")
    const { hideEventName, awards, event, status, teamKey, disableVisibilityRenderer } = this.props

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} lg={4}>
          {!hideEventName && <React.Fragment>
            <Typography variant='title' gutterBottom>
              <Link to={`/event/${event.key}`}>{event.name}</Link>
            </Typography>
            <Typography variant='caption' gutterBottom>
              {event.getDateString()}
            </Typography>
          </React.Fragment>}
          <TeamEventResults
            status={status}
            awards={awards}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <MatchListContainer
            eventKey={event.key}
            selectedTeamKey={teamKey}
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
