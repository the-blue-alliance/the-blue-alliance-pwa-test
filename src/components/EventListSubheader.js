import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import { ListItemText, ListSubheader } from 'material-ui/List'

const styles = theme => ({
  subHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  subHeaderText: {
    color: theme.palette.primary.contrastText,
  },
})

class EventListSubheader extends PureComponent {
  render() {
    const { classes, text } = this.props
    return (
      <ListSubheader className={classes.subHeader}>
        <ListItemText primary={text} classes={{primary: classes.subHeaderText}}/>
      </ListSubheader>
    )
  }
}

EventListSubheader.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(EventListSubheader)
