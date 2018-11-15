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
    '& li': {
      color: theme.palette.type === 'light' ?  theme.palette.common.black : theme.palette.common.white,
    },
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
          playoffStatusStr = <React.Fragment><strong>Won</strong> the <strong>{playoffLevel === 'f' ? 'Event' : levelMap[playoffLevel]}</strong></React.Fragment>
        } else if (playoffStatus === 'playing') {
          playoffStatusStr = <React.Fragment><strong>Playing</strong> in the <strong>{levelMap[playoffLevel]}</strong></React.Fragment>
        } else if (playoffStatus === 'eliminated') {
          playoffStatusStr = <React.Fragment><strong>Eliminated</strong> in the <strong>{levelMap[playoffLevel]}</strong></React.Fragment>
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
                <Typography variant='subtitle1'>
                  Rank: <strong>{status.getIn(['qual', 'ranking', 'rank'])}/{status.getIn(['qual', 'num_teams'])}</strong>
                </Typography>
              }
              {status.getIn(['qual', 'ranking', 'record']) &&
                <Typography variant='subtitle1'>
                  Qual Record: <strong>{status.getIn(['qual', 'ranking', 'record', 'wins'])}-{status.getIn(['qual', 'ranking', 'record', 'losses'])}-{status.getIn(['qual', 'ranking', 'record', 'ties'])}</strong>
                </Typography>
              }
              {status.getIn(['alliance']) &&
                <Typography variant='subtitle1'>
                  Alliance: <strong>{pickOrderStr}</strong> of <strong>{status.getIn(['alliance', 'name'])}</strong>
                </Typography>
              }
              {status.getIn(['playoff', 'record']) &&
                <Typography variant='subtitle1'>
                  Playoff Record: <strong>{status.getIn(['playoff', 'record', 'wins'])}-{status.getIn(['playoff', 'record', 'losses'])}-{status.getIn(['playoff', 'record', 'ties'])}</strong>
                </Typography>
              }
              {playoffStatusStr &&
                <Typography variant='subtitle1'>
                  Status: {playoffStatusStr}
                </Typography>
              }
            </React.Fragment>
            :
            <React.Fragment>
              <Typography variant='subtitle1'>
                <Skeleton width='50%'/>
              </Typography>
              <Typography variant='subtitle1'>
                <Skeleton width='80%'/>
              </Typography>
            </React.Fragment>
          }

          {awards ?
            (awards.size > 0 &&
              <React.Fragment>
                <Typography variant='subtitle1'>Awards:</Typography>
                <ul className={classes.awardList}>
                  {awards.map(award =>
                    <li key={award.key}><Typography>{award.name}</Typography></li>
                  )}
                </ul>
              </React.Fragment>
            )
          :
            <React.Fragment>
              <Typography variant='subtitle1'>
                <Skeleton width='50%'/>
              </Typography>
              <Typography variant='subtitle1'>
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
