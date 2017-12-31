import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';

import TBANavDrawerContainer from './containers/TBANavDrawerContainer'
import TBABottomNav from './components/TBABottomNav'

import HomePageContainer from './containers/HomePageContainer'
import EventListPageContainer from './containers/EventListPageContainer'
import EventPageContainer from './containers/EventPageContainer'
import MatchPageContainer from './containers/MatchPageContainer'
import TeamListPageContainer from './containers/TeamListPageContainer'
import TeamPageContainer from './containers/TeamPageContainer'

import MatchDialogContainer from './containers/MatchDialogContainer'
import TeamAtEventDialog from './components/TeamAtEventDialog'


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
        <Hidden smDown>
          <TBANavDrawerContainer />
        </Hidden>
        <Hidden mdUp>
          <TBABottomNav />
        </Hidden>
        <Route component={ModalSwitch} />
      </div>
    )
  }
}

export default withStyles(styles)(TBAApp);
