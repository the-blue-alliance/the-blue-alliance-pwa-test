// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import Grid from '@material-ui/core/Grid'

// TBA Components
import TeamEventMatchListContainer from '../containers/TeamEventMatchListContainer'
import TeamAtEventResultsContainer from '../containers/TeamAtEventResultsContainer'

const styles = theme => ({
  results: {
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit*3,
    }
  },
  matches: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit,
      paddingRight: theme.spacing.unit*3,
    },
  },
})

class TeamAtEvent extends PureComponent {
  render() {
    console.log("Render TeamAtEvent")
    const { classes, event, teamKey } = this.props

    return (
      <Grid container>
        <Grid item xs={12} md={4} className={classes.results}>
          <TeamAtEventResultsContainer
            teamKey={teamKey}
            eventKey={event.key}
          />
        </Grid>
        <Grid item xs={12} md={8} className={classes.matches}>
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
}

export default withStyles(styles)(TeamAtEvent)
