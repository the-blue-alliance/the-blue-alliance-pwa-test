import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';

import AppNavContainer from '../containers/AppNavContainer'
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

class TeamListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIdx: 0,
    };
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchTeamListAll()
  }

  handleChangeIndex = tabIdx => {
    this.setState({tabIdx});
  };

  handleChange = (event, tabIdx) => {
    this.setState({tabIdx});
  };

  render() {
    console.log("Render TeamListPage");

    let tabList = this.props.teamListTabs.tabNames.map(function(tabName, i){
      return (
        <Tab key={i} label={tabName} />
      )
    })
    var tabs
    if (tabList.length !== 0) {
      tabs = (
        <Tabs
          value={this.state.tabIdx}
          onChange={this.handleChange}
          indicatorColor="white"
          scrollable
          scrollButtons="auto"
        >
          {tabList}
        </Tabs>
      )
    } else {
      tabs = null
    }
    let tabContentList = this.props.teamListTabs.tabTeams.map(function(teams, i){
      return (
        <TeamsList key={i} teams={teams} />
      )
    })
    return (
      <AppNavContainer
        title={"Teams"}
        refreshFunction={this.refreshFunction}
        tabs={tabs}
      >
        <SwipeableViews
          containerStyle={styles.slideContainer}
          index={this.state.tabIdx}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabContentList}
        </SwipeableViews>
      </AppNavContainer>
    )
  }
}

export default withStyles(styles)(TeamListPage);
