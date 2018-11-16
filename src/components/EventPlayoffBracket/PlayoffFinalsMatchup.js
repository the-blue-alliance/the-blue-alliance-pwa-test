// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components

// TBA Components
import Spacer from './Spacer'
import PlayoffMatchupAlliance from './PlayoffMatchupAlliance'

const styles = theme => ({
  centerSpacer: {
    minHeight: theme.spacing.unit,
  },
})

const PlayoffFinalsMatchup = React.memo(({classes, redSeed, blueSeed, redWins, blueWins, winner}) => {
  return (
    <React.Fragment>
      <Spacer />
      <PlayoffMatchupAlliance
        color='red'
        seed={redSeed}
        wins={redWins}
        isWinner={winner === 'red'}
      />
      <div className={classes.centerSpacer} />
      <PlayoffMatchupAlliance
        color='blue'
        seed={blueSeed}
        wins={blueWins}
        isWinner={winner === 'blue'}
      />
      <Spacer />
    </React.Fragment>
  )
})

export default withStyles(styles)(PlayoffFinalsMatchup)
