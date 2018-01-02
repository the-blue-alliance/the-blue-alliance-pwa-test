import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';

import TBASideNavContainer from './containers/TBASideNavContainer'
import TBABottomNavContainer from './containers/TBABottomNavContainer'

import HomePageContainer from './containers/HomePageContainer'
import EventListPageContainer from './containers/EventListPageContainer'
import EventPageContainer from './containers/EventPageContainer'
import MatchPageContainer from './containers/MatchPageContainer'
import TeamListPageContainer from './containers/TeamListPageContainer'
import TeamPageContainer from './containers/TeamPageContainer'

import MatchDialogContainer from './containers/MatchDialogContainer'
import TeamAtEventDialog from './components/TeamAtEventDialog'

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

class ModalSwitch extends React.Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
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
        {isModal ? <Route path='/match/:matchKey' component={MatchDialogContainer} /> : null}
        {isModal ? <Route path='/team/:teamNumber/:year?' component={TeamAtEventDialog} /> : null}
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
