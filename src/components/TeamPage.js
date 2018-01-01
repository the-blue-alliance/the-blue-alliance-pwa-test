import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'

const styles = {
  sideNav: {
    position: 'fixed',
  },
}

class TeamPage extends PureComponent {
  constructor(props) {
    super(props)
    props.setBottomNav('teams')
    props.resetPage()
    // props.setPageState({
    // })
    this.state = {
      isFirstRender: true,
    }
  }

  componentDidMount() {
    this.refreshFunction()
  }

  componentDidUpdate() {
    // Rerender without cascading
    setTimeout(() => this.setState({ isFirstRender: false }), 0)
  }

  refreshFunction = () => {
    this.props.fetchTeamInfo(this.props.teamNumber)
    this.props.fetchTeamYearEvents(this.props.teamNumber, this.props.year)
  }

  render() {
    console.log("Render Team Page")

    const teamNumber = this.props.teamNumber
    const year = this.props.year
    const team = this.props.team
    const teamYearEvents = this.props.teamYearEvents

    var name = null
    var nickname = null
    var eventList = <CircularProgress color="accent" size={100} />
    if (team) {
      if (team) {
        name = team.get('name')
        nickname = team.get('nickname')
      }
    }
    if (teamYearEvents) {
      eventList = teamYearEvents.valueSeq().map(function(event){
        return <li key={event.get('key')}><Link to={`/event/${event.get('key')}`}>{event.get('name')}</Link></li>
      })
    }

    return (
      <TBAPageContainer
        documentTitle={`Team ${teamNumber} (${year})`}
        refreshFunction={this.refreshFunction}
        restoreScroll={this.state.isFirstRender}
      >
        <ResponsiveLayout>
          <Grid container spacing={24}>
            <Grid item xs={3} lg={2}>
              <div className={this.props.classes.sideNav}>
                <Select
                  value={2018}
                  // onChange={this.handleChange}
                  // input={<Input name="age" id="age-simple" />}
                >
                  <MenuItem value={2018}>2018 Season</MenuItem>
                  <MenuItem value={2017}>2017 Season</MenuItem>
                  <MenuItem value={2016}>2016 Season</MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid item xs={9} lg={10}>
              <h1>Team {teamNumber}{nickname && ` - ${nickname}`}</h1>
              {name && <p>aka {name}</p>}
              {eventList && <ul>{eventList}</ul>}
            </Grid>
          </Grid>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

export default withStyles(styles)(TeamPage)
