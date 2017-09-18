import React, { Component } from 'react';

import AppNavContainer from '../containers/AppNavContainer'


class Teams extends Component {
  componentWillMount() {
    console.log("Queue fetch")
    fetch(
      'https://www.thebluealliance.com/api/v3/teams/0',
      {headers: {'X-TBA-Auth-Key': 'POvVo9CNx9v7GKzQdHTgpru5S1G3sDjrsiA3FtbFCeedQsBJPN1VN06IYsNbKgCf'}
    }).then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      return []
    }).then((teams) => {
      this.props.setTeamList(teams)
    })
  }

  render() {
    console.log("Render Teams");
    return (
      <AppNavContainer
        title={"Teams"}
      >
        <h1>Teams</h1>
        {this.props.paginatedTeams[0].nickname}
      </AppNavContainer>
    )
  }
}

export default Teams;
