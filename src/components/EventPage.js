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
    this.props.resetPage()
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.state.eventKey)
    this.props.fetchEventTeams(this.state.eventKey)
  }

  render() {
    console.log("Render Event Page")

    const eventKey = this.state.eventKey
    const event = this.props.event
    const eventTeams = this.props.eventTeams

    var name = eventKey
    var teamList = <CircularProgress color="accent" size={20} />
    if (event) {
      if (event) {
        name = event.get('name')
      }
    }
    if (eventTeams) {
      if (eventTeams) {
        teamList = eventTeams.map(function(team){
          return <li key={team.get('key')}><Link to={`/team/${team.get('team_number')}`}>{team.get('team_number')} - {team.get('nickname')}</Link></li>;
        })
      }
    }

    return (
      <AppNavContainer
        title={name}
        refreshFunction={this.refreshFunction}
      >
        <h1>{name}</h1>
        {teamList && <ul>{teamList}</ul>}
      </AppNavContainer>
    )
  }
}

export default EventPage;
