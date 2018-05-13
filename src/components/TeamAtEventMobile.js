// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { ordinal } from '../utils'

// Components
import { CircularProgress } from 'material-ui/Progress'
import InfoIcon from '@material-ui/icons/Info'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Skeleton from 'react-loading-skeleton'
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
  zeroDataContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataIcon: {
    width: '15%',
    height: 'auto',
    margin: '0 auto',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class TeamAtEventMobile extends PureComponent {
  render() {
    console.log("Render TeamAtEventMobile")
    const { classes, scrollElement, isLoading, event, matches, status, awards, teamKey } = this.props
    return (
      <React.Fragment>
        <Paper className={classes.statusCard}>
          <Typography variant='title'>
            <Link to={{pathname: `/event/${event.key}`}}>
              {event.name}
            </Link>
          </Typography>
          {(isLoading || (status && status.get('qual'))) ?
            <React.Fragment>
              <Typography variant='subheading'>
                {status && status.getIn(['qual', 'ranking', 'rank']) ?
                  <React.Fragment>Rank: <b>{status.getIn(['qual', 'ranking', 'rank'])}/{status.getIn(['qual', 'num_teams'])}</b></React.Fragment>
                  :
                  <Skeleton />
                }
              </Typography>
              <Typography variant='subheading'>
                {status && status.getIn(['qual', 'ranking', 'record']) ?
                  <React.Fragment>Qual Record: <b>{status.getIn(['qual', 'ranking', 'record', 'wins'])}-{status.getIn(['qual', 'ranking', 'record', 'losses'])}-{status.getIn(['qual', 'ranking', 'record', 'ties'])}</b></React.Fragment>
                  :
                  <Skeleton />
                }
              </Typography>
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
            </React.Fragment>
            :
            <div className={classes.zeroDataContainer}>
              <InfoIcon className={classes.zeroDataIcon} />
              <Typography variant='subheading'>No event results found</Typography>
            </div>
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
          {matches ? <MatchList
              scrollElement={scrollElement}
              matches={matches}
              selectedTeamKey={teamKey}
            />
            :
            <div className={classes.zeroDataContainer}>
              {isLoading ?
                <CircularProgress color='secondary' size='25%' className={classes.zeroDataSpinner} />
                :
                <VideogameAssetIcon className={classes.zeroDataIcon} />
              }
              <Typography variant='subheading'>{isLoading ? 'Matches loading' : 'No matches found'}</Typography>
            </div>
          }
        </Paper>
      </React.Fragment>
    )
  }
}

TeamAtEventMobile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TeamAtEventMobile)
