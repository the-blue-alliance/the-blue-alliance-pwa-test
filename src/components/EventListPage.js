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
  slide: {
    height: '100%',
  }
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

    const tabs = (
      <Tabs
        value={this.state.tabIdx}
        onChange={this.handleChange}
        indicatorColor="white"
        scrollable
        scrollButtons="auto"
      >
        <Tab label="Week 1" />
        <Tab label="Week 2" />
        <Tab label="Week 3" />
        <Tab label="Week 4" />
        <Tab label="Week 5" />
        <Tab label="Week 6" />
        <Tab label="Week 7" />
      </Tabs>
    )

    var events = null
    if (this.props.eventsByYear[2017] && this.props.eventsByYear[2017].data) {
      events = this.props.eventsByYear[2017].data
    }

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
        tabs={tabs}
      >
        <YearPickerDialog
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        />
        <SwipeableViews className={this.props.classes.slideContainer} index={this.state.tabIdx} onChangeIndex={this.handleChangeIndex}>
          <div className={this.props.classes.slide}>
            <EventsList events={events} week={0}/>
          </div>
          <div className={this.props.classes.slide}>
            <EventsList events={events} week={1}/>
          </div>
          <div className={this.props.classes.slide}>
            <EventsList events={events} week={2}/>
          </div>
          <div className={this.props.classes.slide}>
            <EventsList events={events} week={3}/>
          </div>
          <div className={this.props.classes.slide}>
            <EventsList events={events} week={4}/>
          </div>
          <div className={this.props.classes.slide}>
            <EventsList events={events} week={5}/>
          </div>
          <div className={this.props.classes.slide}>
            <EventsList events={events} week={6}/>
          </div>
        </SwipeableViews>
      </AppNavContainer>
    );
  }
}

export default withStyles(styles)(EventListPage);
