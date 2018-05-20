import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import clipboard from 'clipboard-polyfill'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import FilterListIcon from '@material-ui/icons/FilterList'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import RefreshIcon from '@material-ui/icons/Refresh'
import SearchIcon from '@material-ui/icons/Search'
import ShareIcon from '@material-ui/icons/Share'
import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import TBALamp from '../icons/tba_lamp'
import HideableBadge from '../components/HideableBadge'
import TBAAppBarSearch from '../components/TBAAppBarSearch'

const styles = theme => ({
  appBarTitle: {
    flex: 1,
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  logo: {
    height: 48,
    width: 48,
  },
  progress: {
    width: 48,
    height: 24,
    padding: 2,
    textAlign: 'center',
  },
})

class TBAToolbar extends PureComponent {
  state = {
    snackbarOpen: false,
  }

  handleClose = () => {
    this.setState({ snackbarOpen: false })
  }

  handleShare = () => {
    if (navigator.share) {
      navigator.share({
          title: document.title,
          url: document.URL,
      })
    } else {
      clipboard.writeText(document.URL)
      this.setState({ snackbarOpen: true })
    }
  }

  render() {
    const { classes, title } = this.props

    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          {title ?
            <IconButton
              color="inherit"
              aria-label="Back"
              onClick={this.props.goBack}
            >
              <ArrowBackIcon />
            </IconButton>
            :
            <TBALamp className={classes.logo} />
          }
          <Typography variant="title" color="inherit" className={classes.appBarTitle} noWrap>
            {title ? title : 'The Blue Alliance'}
          </Typography>
          <Hidden smDown implementation="css">
            <TBAAppBarSearch />
          </Hidden>
          {this.props.filterFunction && <IconButton color="inherit" onClick={this.props.filterFunction}>
            <HideableBadge
              badgeContent={this.props.filterCount}
              color='secondary'
              hidden={this.props.filterCount === 0}
              style={{height: 24, width: 24}}
            >
              <FilterListIcon />
            </HideableBadge>
          </IconButton>}
          {!this.props.isLoading && this.props.refreshFunction &&
            <IconButton color="inherit" onClick={() => this.props.refreshFunction()}>
              <RefreshIcon />
            </IconButton>
          }
          {this.props.isLoading &&
            <div className={classes.progress}>
              <CircularProgress color="secondary" size={20} thickness={5}/>
            </div>
          }
          <Hidden mdUp implementation="css">
            <IconButton color="inherit" component={Link} to={{pathname: '/search', state: {modal: true, searchModal: true}}}>
              <SearchIcon />
            </IconButton>
          </Hidden>
          <IconButton color="inherit" onClick={this.handleShare}>
            <ShareIcon />
          </IconButton>
        </Toolbar>
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          open={this.state.snackbarOpen}
          onClose={this.handleClose}
          autoHideDuration={2000}
          message='Link copied!'
        />
      </React.Fragment>
    )
  }
}

class TBAAppBar extends PureComponent {
  render() {
    console.log("Render TBAAppBar")
    const {tabs, ...otherProps} = this.props
    return (
      <AppBar>
        <TBAToolbar {...otherProps} />
        {tabs}
      </AppBar>
    )
  }
}

TBAAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TBAAppBar)
