// General
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components

// TBA Components

const styles = theme => ({
  spacer: {
    flexGrow: 1,
    '&:first-child': {
      flexGrow: 0.5,
    },
    '&:last-child': {
      flexGrow: 0.5,
    },
  },
})

const Spacer = ({classes}) => {
  return <div className={classes.spacer}/>
}

export default withStyles(styles)(Spacer)
