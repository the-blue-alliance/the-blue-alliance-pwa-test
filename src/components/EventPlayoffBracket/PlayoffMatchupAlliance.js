// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

// Components

// TBA Components

const styles = theme => ({
  alliance: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    // padding: theme.spacing.unit/2,
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.spacing.unit/2,
    boxShadow: theme.shadows[2],
    overflow: 'hidden',
  },
  red: {
    flexDirection: 'column-reverse',
    marginTop: theme.spacing.unit,
  },
  blue: {
    marginBottom: theme.spacing.unit,
  },
  winsContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.unit/4,
  },
  redWins: {
    backgroundColor: theme.palette.type === 'light' ? '#FFDDDD' : '#802020',
  },
  blueWins: {
    backgroundColor: theme.palette.type === 'light' ? '#DDDDFF' : '#202080',
  },
  winner: {
    fontWeight: 'bold',
  },
  seed: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
    paddingLeft: theme.spacing.unit/2,
  },
  spaceRight: {
    marginRight: theme.spacing.unit,
  },
  spaceLeft: {
    marginLeft: theme.spacing.unit,
  },
  teamContainer: {
    padding: theme.spacing.unit/2,
  },
})

const PlayoffMatchupAlliance = ({classes, color, seed, wins, isWinner, spaceLeft, spaceRight}) => {
  const isRed = color === 'red'
  return (
    <div
      className={classNames({
        [classes.alliance]: true,
        [classes.red]: isRed,
        [classes.blue]: !isRed,
        [classes.spaceLeft]: spaceLeft,
        [classes.spaceRight]: spaceRight,
      })}
    >
      <div
        className={classNames({
          [classes.winsContainer]: true,
          [isRed ? classes.redWins : classes.blueWins]: true,
          [classes.winner]: isWinner,
        })}
      >
        <div className={classes.seed}>{seed}.</div>
        <div>{wins}</div>
        <div className={classes.seed} />
      </div>
      <div className={classes.teamContainer}>
        <div>9999</div>
        <div>9999</div>
        <div>9999</div>
        <div>9999</div>
      </div>
    </div>
  )
}

export default withStyles(styles)(PlayoffMatchupAlliance)
