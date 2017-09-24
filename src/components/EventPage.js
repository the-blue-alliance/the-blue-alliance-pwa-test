import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import EventIcon from 'material-ui-icons/Event';

import MatchList from './MatchList'
import TeamsList from './TeamsList'

import TBAPageContainer from '../containers/TBAPageContainer'

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
      tabIdx: 0,
    }
    this.props.resetPage()
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.props.match.params.eventKey)
    this.props.fetchEventMatches(this.props.match.params.eventKey)
    this.props.fetchEventTeams(this.props.match.params.eventKey)
  }

  tabHandleChangeIndex = tabIdx => {
    this.setState({tabIdx});
  }

  tabHandleChange = (event, tabIdx) => {
    this.setState({tabIdx});
  }

  render() {
    console.log("Render Event Page")

    const event = this.props.event
    const matches = this.props.matches
    const teams = this.props.teams

    var name = null
    if (event) {
      name = event.get('name')
    }

    return (
      <TBAPageContainer
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
            <Tab label={"Info"} />
            <Tab label={"Teams"} />
            <Tab label={"Matches"} />
          </Tabs>
        }
      >
        <SwipeableViews
          containerStyle={styles.slideContainer}
          index={this.state.tabIdx}
          onChangeIndex={this.tabHandleChangeIndex}
        >
          <div>
            <List>
              <ListItem>
                <ListItemIcon>
                  <InfoOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Dates go here" />
              </ListItem>
            </List>
          </div>
          <TeamsList teams={teams} />
          <MatchList matches={matches} />
        </SwipeableViews>
      </TBAPageContainer>
    )
  }
}

export default withStyles(styles)(EventPage);
