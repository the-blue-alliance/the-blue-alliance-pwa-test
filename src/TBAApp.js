import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'
import indigo from 'material-ui/colors/indigo'
import amber from 'material-ui/colors/amber'
import CssBaseline from 'material-ui/CssBaseline'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'

import TBASideNavContainer from './containers/TBASideNavContainer'
import TBABottomNavContainer from './containers/TBABottomNavContainer'
import TBASnackbarsContainer from './containers/TBASnackbarsContainer'
import TBAModalDialog from './components/TBAModalDialog'

import HomePageContainer from './containers/HomePageContainer'
import EventListPageBase from './pages/EventListPageBase'
import EventPageContainer from './containers/EventPageContainer'
import MatchPageContainer from './containers/MatchPageContainer'
import TeamListPageContainer from './containers/TeamListPageContainer'
import TeamPageBase from './pages/TeamPageBase'

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

  componentWillReceiveProps(nextProps) {
    // When props change, check if the URL has changed or not
    if (this.getPage(this.props.location) !== this.getPage(nextProps.location)) {
      this.sendPageChange(this.getPage(nextProps.location))
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
  previousLocation = this.props.location
  modalKeyDepths = {}
  initialKey = null

  componentWillMount() {
    this.initialKey = this.props.location.key
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }

    if (nextProps.location.key !== location.key && nextProps.history.action === 'PUSH') {
      if (location.state && location.state.modal) {
        if (location.key in this.modalKeyDepths) {
          this.modalKeyDepths[nextProps.location.key] = this.modalKeyDepths[location.key] + 1
        } else {
          this.modalKeyDepths[nextProps.location.key] = 1
        }
      } else {
        this.modalKeyDepths[nextProps.location.key] = 1
      }
    }

    const nextIsModal = (
      nextProps.location.state &&
      nextProps.location.state.modal &&
      this.initialKey !== nextProps.location.key
    )
    if (nextIsModal && !this.state.modalOpen) {
      this.setState({modalOpen: true})
    }
    if (!nextIsModal && this.state.modalOpen) {
      this.setState({modalOpen: false})
    }
  }

  handleClose = () => {
    this.setState({modalOpen: false})
    this.props.history.go(-this.modalKeyDepths[this.props.location.key])
  }

  render() {
    const { location } = this.props
    const isModal = (
      location.state !== undefined &&
      location.state.modal &&
      this.initialKey !== location.key
    )

    return (
      <React.Fragment>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={HomePageContainer} />
          <Route path='/events/:year' component={EventListPageBase} />
          <Route path='/events' component={EventListPageBase} />
          <Route path='/event/:eventKey' component={EventPageContainer} />
          <Route path='/match/:matchKey' component={MatchPageContainer} />
          <Route path='/teams' component={TeamListPageContainer} />
          <Route path='/team/:teamNumber/:year?' component={TeamPageBase} />
        </Switch>
        <TBAModalDialog isModal={isModal} open={this.state.modalOpen} handleClose={this.handleClose} />
      </React.Fragment>
    )
  }
}

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
        <CssBaseline />
        <TBASnackbarsContainer />
        <Hidden smDown implementation="css">
          <Route path="/" component={TBASideNavContainer} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Route path="/" component={TBABottomNavContainer} />
        </Hidden>
        <Route component={ModalSwitch} />
        <Route path="/" component={Analytics}/>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(TBAApp)
