import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import Reboot from 'material-ui/Reboot';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Dialog from 'material-ui/Dialog';

import TBASideNavContainer from './containers/TBASideNavContainer'
import TBABottomNavContainer from './containers/TBABottomNavContainer'
import TBASnackbarsContainer from './containers/TBASnackbarsContainer'

import HomePageContainer from './containers/HomePageContainer'
import EventListPageContainer from './containers/EventListPageContainer'
import EventPageContainer from './containers/EventPageContainer'
import MatchPageContainer from './containers/MatchPageContainer'
import TeamListPageContainer from './containers/TeamListPageContainer'
import TeamPageContainer from './containers/TeamPageContainer'

import MatchDialogContainer from './containers/MatchDialogContainer'
import TeamAtEventDialogContainer from './containers/TeamAtEventDialogContainer'


// For Google Analytics tracking
ReactGA.initialize('UA-XXXXXXXX') // TODO: Change to real tracking number
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

const ModalRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      let props = Object.assign(routeProps, rest)
      return React.createElement(component, props)
    }}/>
  )
}

class ModalSwitch extends React.Component {
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

    if (nextProps.history.action === 'PUSH') {
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
  }

  handleClose = () => {
    this.props.history.go(-this.modalKeyDepths[this.props.location.key])
  }

  render() {
    const { location } = this.props
    const isModal = (
      location.state &&
      location.state.modal &&
      this.initialKey !== location.key
    )

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={HomePageContainer} />
          <Route path='/events' component={EventListPageContainer} />
          <Route path='/event/:eventKey' component={EventPageContainer} />
          <Route path='/match/:matchKey' component={MatchPageContainer} />
          <Route path='/teams' component={TeamListPageContainer} />
          <Route path='/team/:teamNumber/:year?' component={TeamPageContainer} />
        </Switch>
        {isModal ?
          <Dialog
            open={true}
            onClose={this.handleClose}
            maxWidth='md'
            fullWidth
          >
            <ModalRoute path='/match/:matchKey' component={MatchDialogContainer} handleClose={this.handleClose} />
            <ModalRoute path='/team/:teamNumber/:year?' component={TeamAtEventDialogContainer} handleClose={this.handleClose} />
          </Dialog>
          :
          null
        }
      </div>
    )
  }
}

const styles = theme => ({
})

class TBAApp extends Component {
  render() {
    return (
      <div>
        <Reboot />
        <TBASnackbarsContainer />
        <Hidden smDown implementation="css">
          <Route path="/" component={TBASideNavContainer} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Route path="/" component={TBABottomNavContainer} />
        </Hidden>
        <Route component={ModalSwitch} />
        <Route path="/" component={Analytics}/>
      </div>
    )
  }
}

export default withStyles(styles)(TBAApp);
