// General
import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

// Components
import AppBar from '@material-ui/core/AppBar'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

// TBA Components
import TBAAppBarSearch from '../components/TBAAppBarSearch'

const styles = theme => ({

  contentMobile: {
    position: 'fixed',
    top: 56,
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up('sm')]: {
      top: 64,
    },
  },
  toolbar: {
    padding: 0,
  },
})

class SearchPageMobile extends PureComponent {
  render() {
    console.log("Render SearchPageMobile")

    const { classes } = this.props

    return (
      <React.Fragment>
        <AppBar color='primary'>
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Back"
              onClick={this.props.goBack}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant='title' color='inherit' noWrap>
              Search
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.contentMobile}>
          TEMP!
        </DialogContent>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(SearchPageMobile)
