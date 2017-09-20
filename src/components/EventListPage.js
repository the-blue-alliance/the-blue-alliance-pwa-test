import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';

import AppNavContainer from '../containers/AppNavContainer'
import EventsList from './EventsList'
import EventFilterDialog from './EventFilterDialog'
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
      eventFilterOpen: false,
      yearPickerOpen: false,
    };
  }

  componentDidMount() {
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchYearEvents(2017)
  }

  tabHandleChangeIndex = tabIdx => {
    this.setState({tabIdx});
  };

  tabHandleChange = (event, tabIdx) => {
    this.setState({tabIdx});
  };

  eventFilterHandleRequestClose = value => {
    this.setState({ eventFilterValue: value, eventFilterOpen: false });
  };

  yearPickerHandleRequestClose = value => {
    this.setState({ yearPickerValue: value, yearPickerOpen: false });
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
          onChange={this.tabHandleChange}
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
            onClick={() => this.setState({ yearPickerOpen: true })}
          >
            2017 Events
          </Button>
        }
        refreshFunction={this.refreshFunction}
        filterFunction={() => this.setState({ eventFilterOpen: true })}
        tabs={tabs}
      >
        <EventFilterDialog
          selectedValue={this.state.eventFilterValue}
          open={this.state.eventFilterOpen}
          onRequestClose={this.eventFilterHandleRequestClose}
        />
        <YearPickerDialog
          selectedValue={this.state.yearPickerValue}
          open={this.state.yearPickerOpen}
          onRequestClose={this.yearPickerHandleRequestClose}
        />
        <SwipeableViews
          containerStyle={styles.slideContainer}
          index={this.state.tabIdx}
          onChangeIndex={this.tabHandleChangeIndex}
        >
          {tabContentList}
        </SwipeableViews>
      </AppNavContainer>
    );
  }
}

export default withStyles(styles)(EventListPage);
