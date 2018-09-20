// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

// Components
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import EventIcon from '@material-ui/icons/Event'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

// TBA Components
import MatchListContainer from '../../containers/MatchListContainer'
import TeamAtEventResults from '../TeamAtEventResults'

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
  },
  header: {
    paddingBottom: 0,
  },
  eventLinkIcon: {
    marginRight: theme.spacing.unit,
  },
})

class TeamAtEventMobile extends PureComponent {
  render() {
    console.log("Render TeamAtEventMobile")
    const { classes, hideEventName, scrollElement, event, status, awards, teamKey } = this.props

    return (
      <React.Fragment>
        <Paper className={classes.card}>
          {!hideEventName && <CardHeader
            className={classes.header}
            action={
              <IconButton
                className={classes.eventLinkIcon}
                component={Link}
                to={{pathname: `/event/${event.key}`}}
              >
                <EventIcon />
              </IconButton>
            }
            title={event.name}
            subheader={event.getDateString()}
          />}
          <TeamAtEventResults
            container={CardContent}
            status={status}
            awards={awards}
          />
          <MatchListContainer
            eventKey={event.key}
            selectedTeamKey={teamKey}
          />
        </Paper>
      </React.Fragment>
    )
  }
}

TeamAtEventMobile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TeamAtEventMobile)
