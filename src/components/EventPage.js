import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppNavContainer from '../containers/AppNavContainer'
import MatchList from './MatchList'
import TeamsList from './TeamsList'

const styles = {
  slideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}

class EventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eventKey: props.match.params.eventKey,
      tabIdx: 0,
    }
    this.props.resetPage()
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.state.eventKey)
    this.props.fetchEventMatches(this.state.eventKey)
    this.props.fetchEventTeams(this.state.eventKey)
  }

  tabHandleChangeIndex = tabIdx => {
    this.setState({tabIdx});
  }

  tabHandleChange = (event, tabIdx) => {
    this.setState({tabIdx});
  }

  render() {
    console.log("Render Event Page")

    const eventKey = this.state.eventKey
    const event = this.props.event
    const matches = this.props.matches
    const teams = this.props.teams

    var name = eventKey
    if (event) {
      if (event) {
        name = event.get('name')
      }
    }

    return (
      <AppNavContainer
        title={name}
        refreshFunction={this.refreshFunction}
        tabs={
          <Tabs
            value={this.state.tabIdx}
            onChange={this.tabHandleChange}
            indicatorColor="white"
            scrollable
            scrollButtons="auto"
          >
            <Tab label={"Matches"} />
            <Tab label={"Teams"} />
          </Tabs>
        }
      >
        <SwipeableViews
          containerStyle={styles.slideContainer}
          index={this.state.tabIdx}
          onChangeIndex={this.tabHandleChangeIndex}
        >
          <MatchList
            matches={matches}
          />
          <TeamsList
            teams={teams}
          />
        </SwipeableViews>
      </AppNavContainer>
    )
  }
}

export default withStyles(styles)(EventPage);
