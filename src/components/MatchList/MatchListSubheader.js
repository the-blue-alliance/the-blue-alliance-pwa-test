import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

const styles = theme => ({
  subHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
})

class MatchListSubheader extends PureComponent {
  render() {
    const { classes, text } = this.props
    return (
      <React.Fragment>
        <ListSubheader component='div' className={classes.subHeader}>
          <ListItemText primary={text}/>
        </ListSubheader>
      </React.Fragment>
    )
  }
}

MatchListSubheader.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(MatchListSubheader)
