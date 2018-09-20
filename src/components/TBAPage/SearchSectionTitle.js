import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

const styles = theme => ({
  subHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  subHeaderText: {
    color: theme.palette.primary.contrastText,
  },
})

class SearchSectionTitle extends PureComponent {
  render() {
    const { classes, text } = this.props
    return (
      <ListSubheader className={classes.subHeader}>
        <ListItemText primary={text} classes={{primary: classes.subHeaderText}}/>
      </ListSubheader>
    )
  }
}

SearchSectionTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
}

export default withStyles(styles)(SearchSectionTitle)
