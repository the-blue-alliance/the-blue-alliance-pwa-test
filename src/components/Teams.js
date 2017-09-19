import React, { Component } from 'react';

import AppNavContainer from '../containers/AppNavContainer'


class Teams extends Component {
  render() {
    console.log("Render Teams");
    return (
      <AppNavContainer
        title={"Teams"}
      >
        <h1>Teams</h1>
      </AppNavContainer>
    )
  }
}

export default Teams;
