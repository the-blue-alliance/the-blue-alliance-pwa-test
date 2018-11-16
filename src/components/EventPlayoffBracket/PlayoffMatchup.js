// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

// Components

// TBA Components
import BracketContext from './BracketContext'
import Spacer from './Spacer'
import PlayoffMatchupAlliance from './PlayoffMatchupAlliance'

const styles = theme => ({
  centerSpacer: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexGrow: 1,
    minHeight: theme.spacing.unit,
  },
  centerSpacerRight: {
    flexDirection: 'row-reverse',
  },
  join: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  joinLeft: {
    borderLeft: '2px solid'
  },
  joinRight: {
    borderRight: '2px solid'
  },
  joinBottom: {
    alignItems: 'flex-end',
  },
  joinBar: {
    borderBottom: '2px solid',
    width: theme.spacing.unit*2,
    margin: `${theme.spacing.unit}px 0`,
  },
  redWin: {
    borderColor: 'red',
  },
  blueWin: {
    borderColor: 'blue',
  },
  notSelected: {
    opacity: 0.3,
  },
})

const PlayoffMatchup = React.memo(({classes, eventKey, compLevel, setNumber, rightSide}) => {
  return (
    <BracketContext.Consumer>
      {({selectedSeed, winStats}) => {
        let redSeed = '?'
        let redWins = '?'
        let blueSeed = '?'
        let blueWins = '?'
        let winner = null
        if (winStats) {
          redSeed = winStats[compLevel][setNumber].redAllianceId + 1
          redWins = winStats[compLevel][setNumber].redWins
          blueSeed = winStats[compLevel][setNumber].blueAllianceId + 1
          blueWins = winStats[compLevel][setNumber].blueWins
          winner = winStats[compLevel][setNumber].winner
        }

        let winnerSeed = null
        if (winner === 'red') {
          winnerSeed = redSeed
        } else if (winner === 'blue') {
          winnerSeed = blueSeed
        }

        return (
          <React.Fragment>
            <Spacer />
            <PlayoffMatchupAlliance
              eventKey={eventKey}
              color='red'
              seed={redSeed}
              wins={redWins}
              isWinner={winner === 'red'}
              spaceLeft={rightSide}
              spaceRight={!rightSide}
            />
            <div
              className={classNames({
                [classes.centerSpacer]: true,
                [classes.centerSpacerRight]: rightSide,
              })}
            >
              <div
                className={classNames({
                  [classes.join]: true,
                  [classes.joinLeft]: !rightSide,
                  [classes.joinRight]: rightSide,
                  [classes.joinBottom]: rightSide && compLevel === 'sf',
                  [classes.redWin]: winner === 'red',
                  [classes.blueWin]: winner === 'blue',
                  [classes.notSelected]: selectedSeed !== null && winnerSeed !== selectedSeed,
                })}
              >
                <div
                  className={classNames({
                    [classes.joinBar]: true,
                    [classes.redWin]: winner === 'red',
                    [classes.blueWin]: winner === 'blue',
                    [classes.notSelected]: selectedSeed !== null && winnerSeed !== selectedSeed,
                  })}
                />
              </div>
            </div>
            <PlayoffMatchupAlliance
              eventKey={eventKey}
              color='blue'
              seed={blueSeed}
              wins={blueWins}
              isWinner={winner === 'blue'}
              spaceLeft={rightSide}
              spaceRight={!rightSide}
            />
            <Spacer />
          </React.Fragment>
        )
      }}
    </BracketContext.Consumer>
  )
})

export default withStyles(styles)(PlayoffMatchup)
