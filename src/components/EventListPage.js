import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';

import AppNavContainer from '../containers/AppNavContainer'
import EventsList from './EventsList'
import YearPickerDialog from './YearPickerDialog'


const styles = {
  slideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}

class EventListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIdx: 0,
      open: false,
    };
  }
  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchYearEvents(2017)
  }

  handleChangeIndex = tabIdx => {
    this.setState({tabIdx});
  };

  handleChange = (event, tabIdx) => {
    this.setState({tabIdx});
  };

  handleRequestClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    console.log("Render EventListPage");

    let tabList = this.props.yearEventTabs.tabNames.map(function(tabName, i){
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
    let tabContentList = this.props.yearEventTabs.tabsByEventType.map(function(events, i){
      return (
        <EventsList key={i} events={events} />
      )
    })

    return (
      <AppNavContainer
        title={
          <Button
            color="contrast"
            onClick={() => this.setState({ open: true })}
          >
            2017 Events
          </Button>
        }
        refreshFunction={this.refreshFunction}
        tabs={tabs}
      >
        <YearPickerDialog
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        />
        <SwipeableViews
          containerStyle={styles.slideContainer}
          index={this.state.tabIdx}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabContentList}
        </SwipeableViews>
      </AppNavContainer>
    );
  }
}

export default withStyles(styles)(EventListPage);
