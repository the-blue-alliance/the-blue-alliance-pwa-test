// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { ordinal } from '../utils'

// Components
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

// TBA Components
import MatchTable from '../components/MatchTable'

const styles = theme => ({
  awardList: {
    margin: 0,
  },
})

class TeamAtEvent extends PureComponent {
  render() {
    console.log("Render TeamAtEvent")
    const { classes, hideEventName, awards, event, matches, status, teamKey, disableVisibilityRenderer } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} lg={4}>
          {!hideEventName &&
          <Typography variant='title' gutterBottom>
            <Link to={`/event/${event.get('key')}`}>{event.get('name')}</Link>
          </Typography>}
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
              <ul className={classes.awardList}>
                {awards.map(award =>
                  <li key={award.key}>{award.name}</li>
                )}
              </ul>
            </React.Fragment>
          }
        </Grid>
        <Grid item xs={12} lg={8}>
          <MatchTable
            matches={matches}
            selectedTeamKey={teamKey}
            disableVisibilityRenderer={disableVisibilityRenderer}
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
