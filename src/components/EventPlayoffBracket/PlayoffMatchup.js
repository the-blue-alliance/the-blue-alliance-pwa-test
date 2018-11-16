// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

// Components

// TBA Components
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
})

const PlayoffMatchup = ({classes, compLevel, redSeed, blueSeed, redWins, blueWins, winner, rightSide}) => {
  return (
    <React.Fragment>
      <Spacer />
      <PlayoffMatchupAlliance
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
          })}
        >
          <div
            className={classNames({
              [classes.joinBar]: true,
              [classes.redWin]: winner === 'red',
              [classes.blueWin]: winner === 'blue',
            })}
          />
        </div>
      </div>
      <PlayoffMatchupAlliance
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
}

export default withStyles(styles)(PlayoffMatchup)
