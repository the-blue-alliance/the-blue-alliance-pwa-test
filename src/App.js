import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import HomeContainer from './containers/HomeContainer'
import EventListPageContainer from './containers/EventListPageContainer'
import EventPageContainer from './containers/EventPageContainer'
import TeamListPageContainer from './containers/TeamListPageContainer'
import TeamPageContainer from './containers/TeamPageContainer'


class App extends Component {
  render() {
    console.log("=====================================================")
    console.log("Render Main");
    return (
      <div>
        <Route exact path='/' component={HomeContainer} />
        <Route path='/events' component={EventListPageContainer} />
        <Route path='/event/:eventKey' component={EventPageContainer} />
        <Route path='/teams' component={TeamListPageContainer} />
        <Route path='/team/:teamNumber/:year?' component={TeamPageContainer} />
      </div>
    )
  }
}

export default App;
