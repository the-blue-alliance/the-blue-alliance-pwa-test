import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import AppNavContainer from '../containers/AppNavContainer'


class TeamPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamNumber: props.match.params.teamNumber,
      year: props.match.params.year === undefined ? 2017 : props.match.params.year,
    }
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchTeamInfo(this.state.teamNumber)
    this.props.fetchTeamYearEvents(this.state.teamNumber, this.state.year)
  }

  render() {
    console.log("Render Team Page")

    const teamNumber = this.state.teamNumber
    const year = this.state.year
    const team = this.props.team
    const teamYearEvents = this.props.teamYearEvents

    var name = null
    var nickname = null
    var isFetching = false
    var eventList = <CircularProgress color="accent" size={100} />
    if (team) {
      isFetching = isFetching || team.isFetching
      if (team.record) {
        name = team.record.name
        nickname = team.record.nickname
      }
    }
    if (teamYearEvents) {
      isFetching = isFetching || teamYearEvents.isFetching
      if (teamYearEvents.record) {
        eventList = teamYearEvents.record.map(function(event){
          return <li key={event.key}><Link to={`/event/${event.key}`}>{event.name}</Link></li>;
        })
      }
    }

    return (
      <AppNavContainer
        title={"Team " + teamNumber + " (" + year + ")"}
        isFetching={isFetching}
        refreshFunction={this.refreshFunction}
      >
        <h1>Team {teamNumber}{nickname && ` - ${nickname}`}</h1>
        {name && <p>aka {name}</p>}
        {eventList && <ul>{eventList}</ul>}
      </AppNavContainer>
    )
  }
}

export default TeamPage;
