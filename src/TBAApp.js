import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'
import indigo from '@material-ui/core/colors/indigo'
import amber from '@material-ui/core/colors/amber'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Hidden from '@material-ui/core/Hidden'

import { setPageKey } from './actions'

import TBAHelmet from './components/TBAHelmet'
import TBASideNavContainer from './containers/TBASideNavContainer'
import TBABottomNavContainer from './containers/TBABottomNavContainer'
import TBASnackbarsContainer from './containers/TBASnackbarsContainer'
import TBAModalDialog from './components/TBAModalDialog'
import SearchModal from './components/SearchModal'

import HomePageContainer from './containers/HomePageContainer'
import EventListPageBase from './pages/EventListPageBase'
import EventPageContainer from './containers/EventPageContainer'
import MatchPageContainer from './containers/MatchPageContainer'
import TeamListPageContainer from './containers/TeamListPageContainer'
import TeamPageBase from './pages/TeamPageBase'
import PageNotFoundContainer from './containers/PageNotFoundContainer'

// For Google Analytics tracking
ReactGA.initialize('UA-3251931-11') // TODO: Change to real tracking number
var canUseDOM = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
)
class Analytics extends Component {
  // Modified from https://github.com/react-ga/react-ga/issues/122#issuecomment-320436578
  constructor(props) {
    super(props)

    // Initial page load - only fired once
    this.sendPageChange(this.getPage(props.location))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // When props change, check if the URL has changed or not
    if (this.getPage(this.props.location) !== this.getPage(prevProps.location)) {
      this.sendPageChange(this.getPage(this.props.location))
    }
  }

  getPage(location) {
    return location.pathname + location.search + location.hash
  }

  sendPageChange(page) {
    if (canUseDOM) {
      ReactGA.pageview(page)
    }
  }

  render() {
    return null
  }
}

class ModalSwitch extends React.Component {
  state = {
    modalOpen: false,
  }
  basePageLocation = this.props.location
  modalKeyDepths = {}
  modalBaseLocations = {}  // Keeps track of what base page was showing for a given modal
  initialKey = null

  constructor(props) {
    super(props)
    this.initialKey = props.location.key
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props
    const { location: nextLocation, history: nextHistory } = nextProps

    // Restore base page location
    if (
      nextHistory.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.basePageLocation = location
    } else {
      const loc = this.modalBaseLocations[nextLocation.key]
      if (loc) {
        this.basePageLocation = loc
      }
    }

    if (nextLocation.key !== location.key && nextHistory.action === 'PUSH') {
      // Keep track of modal depth
      if (location.state && location.state.modal) {
        if (location.key in this.modalKeyDepths) {
          this.modalKeyDepths[nextLocation.key] = this.modalKeyDepths[location.key] + 1
        } else {
          this.modalKeyDepths[nextLocation.key] = 1
        }
      } else {
        this.modalKeyDepths[nextLocation.key] = 1
      }

      // Keep track of base page location
      if (nextLocation.state && nextLocation.state.modal) {
        if (location.state && location.state.modal && this.modalBaseLocations[location.key]) {
          this.modalBaseLocations[nextLocation.key] = this.modalBaseLocations[location.key]
        } else {
          this.modalBaseLocations[nextLocation.key] = location
        }
      }
    }

    // Set modalOpen state
    const nextIsModal = (
      nextLocation.state &&
      nextLocation.state.modal &&
      this.initialKey !== nextLocation.key
    )
    if (nextIsModal && !this.state.modalOpen) {
      ReactDOM.unstable_deferredUpdates(() => this.setState({modalOpen: true}))
      this.props.setPageKey(this.basePageLocation.key)
    }
    if (!nextIsModal && this.state.modalOpen) {
      // Set synchronously to ensure modal is closed after navigation
      this.setState({modalOpen: false})
    }
  }

  handleClose = () => {
    ReactDOM.unstable_deferredUpdates(() => this.setState({modalOpen: false}))
    this.props.history.go(-this.modalKeyDepths[this.props.location.key])
  }

  render() {
    const { location } = this.props
    const isModal = (
      location.state !== undefined &&
      location.state.modal &&
      this.initialKey !== location.key
    )

    // Set key to force remount when route changes
    return (
      <React.Fragment key={isModal ? this.basePageLocation.key : location.key}>
        <Switch location={isModal ? this.basePageLocation : location}>
          <Route exact path='/' component={HomePageContainer} />
          <Route path='/events/:year' component={EventListPageBase} />
          <Route path='/events' component={EventListPageBase} />
          <Route path='/event/:eventKey' component={EventPageContainer} />
          <Route path='/match/:matchKey' component={MatchPageContainer} />
          <Route path='/teams' component={TeamListPageContainer} />
          <Route path='/team/:teamNumber/:year?' component={TeamPageBase} />
          <Route component={PageNotFoundContainer} />
        </Switch>
        <TBAModalDialog isModal={isModal && !Boolean(location.state.searchModal)} open={this.state.modalOpen} handleClose={this.handleClose} />
        <SearchModal isModal={isModal && Boolean(location.state.searchModal)} open={this.state.modalOpen} handleClose={this.handleClose} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
  setPageKey: basePageKey => dispatch(setPageKey(basePageKey)),
})

const ModalSwitchConainer = connect(mapStateToProps, mapDispatchToProps)(ModalSwitch)

const styles = theme => ({
})

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
  typography: {
    title: {
      fontWeight: 400,
    },
  },
})

class TBAApp extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Whoops! Something went wrong on our end.
          Please close the app and restart it.
          <a href="/">Or try clicking here!</a>
        </div>
      )
    }
    return (
      <MuiThemeProvider theme={theme}>
        <TBAHelmet>
          <meta name='description' content='The best way to scout, watch, and relive the FIRST Robotics Competition.' />
        </TBAHelmet>
        <CssBaseline />
        <TBASnackbarsContainer />
        <Hidden smDown implementation="css">
          <TBASideNavContainer />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Route path="/" component={TBABottomNavContainer} />
        </Hidden>
        <Route component={ModalSwitchConainer} />
        <Route path="/" component={Analytics}/>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(TBAApp)
