// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components

// TBA Components
import PlayoffMatchup from './PlayoffMatchup'

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  round: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    maxWidth: 80,
    margin: theme.spacing.unit,
  },
})

class EventPlayoffBracket extends React.PureComponent {
  render() {
    console.log("Render EventPlayoffBracket")

    const { classes, alliances, matches } = this.props

    return (
      <div className={classes.container}>
        <div className={classes.round}>
          <PlayoffMatchup level='QF' />
          <PlayoffMatchup level='QF' />
        </div>
        <div className={classes.round}>
          <PlayoffMatchup level='SF' />
        </div>
        <div className={classes.round}>
          <PlayoffMatchup level='F' />
        </div>
        <div className={classes.round}>
          <PlayoffMatchup level='SF' rightSide/>
        </div>
        <div className={classes.round}>
          <PlayoffMatchup level='QF' rightSide/>
          <PlayoffMatchup level='QF' rightSide/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(EventPlayoffBracket)
