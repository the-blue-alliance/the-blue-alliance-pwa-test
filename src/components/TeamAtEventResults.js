// General
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { ordinal } from '../utils'

// Components
import Typography from '@material-ui/core/Typography'

// TBA Components
import Skeleton from '../components/Skeleton'

const styles = theme => ({
  awardList: {
    margin: 0,
  },
})

const levelMap = {
  ef: 'Octofinals',
  qf: 'Quarterfinals',
  sf: 'Semifinals',
  f: 'Finals',
}

class TeamAtEventResults extends PureComponent {
  render() {
    console.log("Render TeamAtEventResults")
    const { classes, container, status, awards } = this.props
    const ContainerComponent = container ? container : React.Fragment

    let playoffStatusStr = null
    let pickOrderStr = null
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

      const pickOrder = status.getIn(['alliance', 'pick'])
      if (pickOrder === 0) {
        pickOrderStr = 'Captain'
      } else if (pickOrder === -1) {
        pickOrderStr = 'Backup'
      } else {
        pickOrderStr = `${ordinal(pickOrder)} Pick`
      }
    }
    if (status && !status.get('qual') && !status.get('playoff') && awards && awards.size === 0) {
      return null
    } else {
      return (
        <ContainerComponent>
          {status ?
            <React.Fragment>
              {status.getIn(['qual', 'ranking', 'rank']) &&
                <Typography variant='subheading'>
                  Rank: <b>{status.getIn(['qual', 'ranking', 'rank'])}/{status.getIn(['qual', 'num_teams'])}</b>
                </Typography>
              }
              {status.getIn(['qual', 'ranking', 'record']) &&
                <Typography variant='subheading'>
                  Qual Record: <b>{status.getIn(['qual', 'ranking', 'record', 'wins'])}-{status.getIn(['qual', 'ranking', 'record', 'losses'])}-{status.getIn(['qual', 'ranking', 'record', 'ties'])}</b>
                </Typography>
              }
              {status.getIn(['alliance']) &&
                <Typography variant='subheading'>
                  Alliance: <b>{pickOrderStr}</b> of <b>{status.getIn(['alliance', 'name'])}</b>
                </Typography>
              }
              {status.getIn(['playoff', 'record']) &&
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
            <React.Fragment>
              <Typography variant='subheading'>
                <Skeleton width='50%'/>
              </Typography>
              <Typography variant='subheading'>
                <Skeleton width='80%'/>
              </Typography>
            </React.Fragment>
          }

          {awards ?
            (awards.size > 0 &&
              <React.Fragment>
                <Typography variant='subheading'>Awards:</Typography>
                <ul className={classes.awardList}>
                  {awards.map(award =>
                    <li key={award.key}>{award.name}</li>
                  )}
                </ul>
              </React.Fragment>
            )
          :
            <React.Fragment>
              <Typography variant='subheading'>
                <Skeleton width='50%'/>
              </Typography>
              <Typography variant='subheading'>
                <Skeleton width='80%'/>
              </Typography>
            </React.Fragment>
          }
        </ContainerComponent>
      )
    }
  }
}

TeamAtEventResults.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.object,
  awards: PropTypes.object,
}

export default withStyles(styles)(TeamAtEventResults)
