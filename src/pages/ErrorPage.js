import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit*3,
    maxWidth: theme.breakpoints.values.sm,
    textAlign: 'center',
  },
})

class ErrorPage extends PureComponent {
  render() {
    console.log("Render ErrorPage")

    const { classes } = this.props

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant='display1' gutterBottom>
            Whoops!
          </Typography>
          <Typography variant='display1' gutterBottom>
            Something went wrong on our end.
          </Typography>
          <Button
            color='primary'
            className={classes.button}
            variant='raised'
            component='a'
            href='/'
            fullWidth
          >
            Reload THe Blue Alliance
          </Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ErrorPage)
