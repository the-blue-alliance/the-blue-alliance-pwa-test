import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import AppNavContainer from '../containers/AppNavContainer'


class EventPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventKey: props.match.params.eventKey,
    }
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.state.eventKey)
    this.props.fetchEventTeams(this.state.eventKey)
  }

  render() {
    console.log("Render Event Page");
    const eventKey = this.state.eventKey
    const eventInfo = this.props.infoByEvent[eventKey]
    const eventTeams = this.props.teamsByEvent[eventKey]

    var name = eventKey
    var isFetching = false
    var teamList = <CircularProgress color="accent" size={20} />
    if (eventInfo) {
      isFetching = isFetching || eventInfo.isFetching
      if (eventInfo.data) {
        name = eventInfo.data.name
      }
    }
    if (eventTeams) {
      isFetching = isFetching || eventTeams.isFetching
      if (eventTeams.data) {
        teamList = eventTeams.data.map(function(team){
          return <li key={team.key}><Link to={`/team/${team.team_number}`}>{team.team_number} - {team.nickname}</Link></li>;
        })
      }
    }

    return (
      <AppNavContainer
        title={name}
        isFetching={isFetching}
        refreshFunction={this.refreshFunction}
      >
        <h1>{name}</h1>
        {teamList && <ul>{teamList}</ul>}
      </AppNavContainer>
    )
  }
}

export default EventPage;
