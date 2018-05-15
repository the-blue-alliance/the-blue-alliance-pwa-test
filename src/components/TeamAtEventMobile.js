// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { ordinal } from '../utils'

// Components
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import EventIcon from '@material-ui/icons/Event'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

// TBA Components
import MatchList from '../components/MatchList'

const styles = theme => ({
  statusCard: {
    margin: theme.spacing.unit,
  },
  eventLinkIcon: {
    marginRight: theme.spacing.unit,
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

const levelMap = {
  ef: 'Octofinals',
  qf: 'Quarterfinals',
  sf: 'Semifinals',
  f: 'Finals',
}

class TeamAtEventMobile extends PureComponent {
  render() {
    console.log("Render TeamAtEventMobile")
    const { classes, hideEventName, scrollElement, isLoading, event, matches, status, awards, teamKey } = this.props

    let playoffStatusStr = null
    if (status) {
      const playoffLevel = status.getIn(['playoff', 'level'])
      const playoffStatus = status.getIn(['playoff', 'status'])
      if (playoffLevel && playoffStatus) {
        if (playoffStatus === 'won') {
          playoffStatusStr = <React.Fragment><b>Won</b> the <b>{playoffLevel === 'f' ? 'Event' : levelMap[playoffLevel]}</b></React.Fragment>
        } else if (playoffStatus === 'playing') {
          playoffStatusStr = <React.Fragment><b>Playing</b> in the <b>{levelMap[playoffLevel]}</b></React.Fragment>
        } else if (playoffStatus === 'eliminated') {
          playoffStatusStr = <React.Fragment><b>Eliminated</b> in the <b>{levelMap[playoffLevel]}</b></React.Fragment>
        }
      }
    }

    return (
      <React.Fragment>
        <Card className={classes.statusCard}>
          {!hideEventName && <CardHeader
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
          <CardContent>
            {(isLoading || (status && (status.get('qual') || status.get('playoff')))) ?
              <React.Fragment>
                <Typography variant='subheading'>
                  {status && status.getIn(['qual', 'ranking', 'rank']) ?
                    <React.Fragment>Rank: <b>{status.getIn(['qual', 'ranking', 'rank'])}/{status.getIn(['qual', 'num_teams'])}</b></React.Fragment>
                    :
                    (!status && <Skeleton />)
                  }
                </Typography>
                <Typography variant='subheading'>
                  {status && status.getIn(['qual', 'ranking', 'record']) ?
                    <React.Fragment>Qual Record: <b>{status.getIn(['qual', 'ranking', 'record', 'wins'])}-{status.getIn(['qual', 'ranking', 'record', 'losses'])}-{status.getIn(['qual', 'ranking', 'record', 'ties'])}</b></React.Fragment>
                    :
                    (!status && <Skeleton />)
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
                {playoffStatusStr &&
                  <Typography variant='subheading'>
                    Status: {playoffStatusStr}
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
          </CardContent>
        </Card>
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
