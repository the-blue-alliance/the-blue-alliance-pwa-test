import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppNavContainer from '../containers/AppNavContainer'


class Home extends Component {
  render() {
    console.log("Render Home");
    return (
      <AppNavContainer
        title={"The Blue Alliance"}
      >
        <h1>Home</h1>
        <Link to="/team/254">254</Link>
      </AppNavContainer>
    )
  }
}

export default Home;
