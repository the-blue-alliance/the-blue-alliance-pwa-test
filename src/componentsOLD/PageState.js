import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    overflow: 'scroll',
  },
})

class PageState extends PureComponent {
  render() {
    console.log("Render PageState")

    const { classes, currentPageState } = this.props

    return (
      <pre className={classes.root}>
        {JSON.stringify(currentPageState.toJS(), null, 2)}
      </pre>
    )
  }
}

export default withStyles(styles)(PageState)
