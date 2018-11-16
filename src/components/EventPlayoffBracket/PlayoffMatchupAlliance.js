// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

// Components

// TBA Components
import BracketContext from './BracketContext'

const styles = theme => ({
  alliance: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    // padding: theme.spacing.unit/2,
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.spacing.unit/2,
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
  },
  selected: {
    boxShadow: theme.shadows[6],
  },
  notSelected: {
    opacity: 0.3,
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
  hasMedal: {
    padding: theme.spacing.unit,
  },
  seed: {
    flex: 1,
    textAlign: 'left',
    fontSize: 12,
    paddingLeft: theme.spacing.unit/2,
  },
  medal: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: theme.spacing.unit/2,
  },
  medalIcon: {
    height: 18,
  },
  spaceRight: {
    marginRight: theme.spacing.unit,
  },
  spaceLeft: {
    marginLeft: theme.spacing.unit,
  },
  teamContainer: {
    fontSize: 14,
    padding: theme.spacing.unit/2,
  },
})

const PlayoffMatchupAlliance = React.memo(({classes, eventKey, color, seed, wins, isWinner, spaceLeft, spaceRight, isFinals}) => {
  const isRed = color === 'red'
  return (
    <BracketContext.Consumer>
      {({selectedSeed, setSelectedSeed, allianceTeamKeys}) => {
        return (
          <div
            className={classNames({
              [classes.alliance]: true,
              [classes.red]: isRed,
              [classes.blue]: !isRed,
              [classes.selected]: selectedSeed === seed,
              [classes.notSelected]: selectedSeed !== null && selectedSeed !== seed,
              [classes.spaceLeft]: spaceLeft,
              [classes.spaceRight]: spaceRight,
            })}
            onMouseEnter={() => setSelectedSeed(seed)}
            onMouseLeave={() => setSelectedSeed(null)}
          >
            <div
              className={classNames({
                [classes.winsContainer]: true,
                [isRed ? classes.redWins : classes.blueWins]: true,
                [classes.winner]: isWinner,
                [classes.hasMedal]: isFinals,
              })}
            >
              <div className={classes.seed}>{seed}.</div>
              <div>{wins}</div>
              <div className={classes.medal}>
                {isFinals && isWinner && <img src='/medal-gold.png' className={classes.medalIcon} alt='Gold medal'/>}
                {isFinals && !isWinner && <img src='/medal-silver.png' className={classes.medalIcon} alt='Silver medal'/>}
              </div>
            </div>
            <div className={classes.teamContainer}>
              {allianceTeamKeys && allianceTeamKeys[seed-1] && allianceTeamKeys[seed-1].map(teamKey => (
                <div key={teamKey}>
                  <Link
                    to={{pathname: `/team/${teamKey.substring(3)}/${eventKey.substring(0, 4)}`, hash: eventKey, state: {modal: true}}}
                  >
                    {teamKey.substring(3)}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    </BracketContext.Consumer>
  )
})

export default withStyles(styles)(PlayoffMatchupAlliance)
