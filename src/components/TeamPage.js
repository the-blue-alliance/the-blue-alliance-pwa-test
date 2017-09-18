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
    console.log("Render Team Page");
    const teamNumber = this.state.teamNumber
    const year = this.state.year
    const teamInfo = this.props.infoByTeam[teamNumber]
    const teamEvents = this.props.eventsByTeamByYear[teamNumber]
    var yearEvents = null
    if (teamEvents) {
      yearEvents = teamEvents[year]
    }

    var name = null
    var nickname = null
    var isFetching = false
    var eventList = <CircularProgress color="accent" size={20} />
    if (teamInfo) {
      isFetching = isFetching || teamInfo.isFetching
      if (teamInfo.data) {
        name = teamInfo.data.name
        nickname = teamInfo.data.nickname
      }
    }
    if (yearEvents) {
      isFetching = isFetching || yearEvents.isFetching
      if (yearEvents.data) {
        eventList = yearEvents.data.map(function(event){
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
