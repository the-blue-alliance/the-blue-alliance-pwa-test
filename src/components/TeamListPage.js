import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import { CircularProgress } from 'material-ui/Progress';

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
    console.log("Render TeamListPage")

    let tabList = this.props.teamsByTab.map(function(tab, i){
      return (
        <Tab key={i} label={tab.tabLabel} />
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
    let tabContentList = this.props.teamsByTab.map(function(tab, i){
      if (tab.tabTeams.record) {
        return <TeamsList key={i} teams={tab.tabTeams.record} />
      } else {
        return <CircularProgress key={i} color="accent" size={100} />
      }
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
