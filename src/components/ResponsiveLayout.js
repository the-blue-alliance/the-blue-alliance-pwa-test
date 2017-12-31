import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: `0 ${theme.spacing.unit}px`,
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacing.unit*3}px`,
    },
  },
})

class ResponsiveLayout extends PureComponent {
  render() {
    return (
      <div className={this.props.classes.root}>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(styles)(ResponsiveLayout)
