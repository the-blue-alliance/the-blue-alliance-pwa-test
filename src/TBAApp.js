import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import TBANavDrawerContainer from './containers/TBANavDrawerContainer'

import HomePageContainer from './containers/HomePageContainer'
import EventListPageContainer from './containers/EventListPageContainer'
import EventPageContainer from './containers/EventPageContainer'
import TeamListPageContainer from './containers/TeamListPageContainer'
import TeamPageContainer from './containers/TeamPageContainer'

const styles = theme => ({
})

class App extends Component {
  render() {
    console.log("=====================================================")
    console.log("Render Main");
    return (
      <div>
        <TBANavDrawerContainer />
        <Route exact path='/' component={HomePageContainer} />
        <Route path='/events' component={EventListPageContainer} />
        <Route path='/event/:eventKey' component={EventPageContainer} />
        <Route path='/teams' component={TeamListPageContainer} />
        <Route path='/team/:teamNumber/:year?' component={TeamPageContainer} />
      </div>
    )
  }
}

export default withStyles(styles)(App);
