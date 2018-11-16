// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components

// TBA Components
import PlayoffMatchup from './PlayoffMatchup'
import PlayoffFinalsMatchup from './PlayoffFinalsMatchup'

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit,
  },
  round: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    maxWidth: 100,
  },
})

class EventPlayoffBracket extends React.PureComponent {
  render() {
    console.log("Render EventPlayoffBracket")

    const { classes, alliances, matches } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.round}>
          <PlayoffMatchup
            compLevel='qf'
            redSeed={1}
            blueSeed={8}
            redWins={2}
            blueWins={1}
            winner='red'
          />
          <PlayoffMatchup
            compLevel='qf'
            redSeed={4}
            blueSeed={5}
            redWins={2}
            blueWins={1}
            winner='red'
          />
        </div>
        <div className={classes.round}>
          <PlayoffMatchup
            compLevel='sf'
            redSeed={1}
            blueSeed={4}
            redWins={2}
            blueWins={1}
            winner='red'
          />
        </div>
        <div className={classes.round}>
          <PlayoffFinalsMatchup
            redSeed={1}
            blueSeed={3}
            redWins={0}
            blueWins={2}
            winner='blue'
          />
        </div>
        <div className={classes.round}>
          <PlayoffMatchup
            compLevel='sf'
            redSeed={2}
            blueSeed={3}
            redWins={0}
            blueWins={2}
            winner='blue'
            rightSide
          />
        </div>
        <div className={classes.round}>
          <PlayoffMatchup
            compLevel='qf'
            redSeed={2}
            blueSeed={7}
            redWins={2}
            blueWins={1}
            winner='red'
            rightSide
          />
          <PlayoffMatchup
            compLevel='qf'
            redSeed={3}
            blueSeed={6}
            redWins={2}
            blueWins={1}
            winner='red'
            rightSide
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(EventPlayoffBracket)
