// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components

// TBA Components
import BracketContext from './BracketContext'
import Spacer from './Spacer'
import PlayoffMatchupAlliance from './PlayoffMatchupAlliance'

const styles = theme => ({
  centerSpacer: {
    minHeight: theme.spacing.unit,
  },
})

const PlayoffFinalsMatchup = React.memo(({classes, eventKey, winner}) => {
  return (
    <BracketContext.Consumer>
      {({selectedSeed, winStats}) => {
        let redSeed = '?'
        let redWins = '?'
        let blueSeed = '?'
        let blueWins = '?'
        let winner = null
        if (winStats) {
          redSeed = winStats.f[1].redAllianceId + 1
          redWins = winStats.f[1].redWins
          blueSeed = winStats.f[1].blueAllianceId + 1
          blueWins = winStats.f[1].blueWins
          winner = winStats.f[1].winner
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
              isFinals
            />
            <div className={classes.centerSpacer} />
            <PlayoffMatchupAlliance
              eventKey={eventKey}
              color='blue'
              seed={blueSeed}
              wins={blueWins}
              isWinner={winner === 'blue'}
              isFinals
            />
            <Spacer />
          </React.Fragment>
        )
      }}
    </BracketContext.Consumer>
  )
})

export default withStyles(styles)(PlayoffFinalsMatchup)
