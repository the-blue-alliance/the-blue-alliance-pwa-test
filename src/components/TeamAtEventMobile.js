// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { ordinal } from '../utils'

// Components
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'

// TBA Components
import MatchList from '../components/MatchList'

const styles = theme => ({
  statusCard: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  matchesCard: {
    margin: theme.spacing.unit,
    padding: `${theme.spacing.unit/2}px 0px`,
  },
})

class TeamAtEventMobile extends PureComponent {
  render() {
    console.log("Render TeamAtEventMobile")
    const { classes, scrollElement, event, matches, status, awards, teamKey } = this.props
    return (
      <React.Fragment>
        <Paper className={classes.statusCard}>
          <Typography variant='title'>
            <Link to={{pathname: `/event/${event.key}`}}>
              {event.name}
            </Link>
          </Typography>
          {status && status.getIn(['qual', 'ranking', 'rank']) &&
            <Typography variant='subheading'>
              Rank: <b>{status.getIn(['qual', 'ranking', 'rank'])}/{status.getIn(['qual', 'num_teams'])}</b>
            </Typography>
          }
          {status && status.getIn(['qual', 'ranking', 'record']) &&
            <Typography variant='subheading'>
              Qual Record: <b>{status.getIn(['qual', 'ranking', 'record', 'wins'])}-{status.getIn(['qual', 'ranking', 'record', 'losses'])}-{status.getIn(['qual', 'ranking', 'record', 'ties'])}</b>
            </Typography>
          }
          {status && status.getIn(['alliance']) &&
            <Typography variant='subheading'>
              Alliance: <b>{status.getIn(['alliance', 'pick']) === 0 ? 'Captain' : `${ordinal(status.getIn(['alliance', 'pick']))} Pick`}</b> of <b>{status.getIn(['alliance', 'name'])}</b>
            </Typography>
          }
          {status && status.getIn(['playoff', 'record']) &&
            <Typography variant='subheading'>
              Playoff Record: <b>{status.getIn(['playoff', 'record', 'wins'])}-{status.getIn(['playoff', 'record', 'losses'])}-{status.getIn(['playoff', 'record', 'ties'])}</b>
            </Typography>
          }
          {awards &&
            <React.Fragment>
              <Typography variant='subheading'>Awards:</Typography>
              <ul>
                {awards.map(award =>
                  <li key={award.key}>{award.name}</li>
                )}
              </ul>
            </React.Fragment>
          }
        </Paper>
        <Paper className={classes.matchesCard}>
          <MatchList
            scrollElement={scrollElement}
            matches={matches}
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
