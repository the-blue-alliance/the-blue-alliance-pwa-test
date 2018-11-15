// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components

// TBA Components

const styles = theme => ({
})

class EventPlayoffBracket extends PureComponent {
  render() {
    console.log("Render EventPlayoffBracket")

    const { classes, alliances, matches } = this.props

    return (
      <div>HI</div>
    )
  }
}

export default withStyles(styles)(EventPlayoffBracket)
