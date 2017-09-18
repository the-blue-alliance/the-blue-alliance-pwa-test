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

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIdx: 0,
      open: false,
    };
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
    console.log("Render Events");

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
        <Tab label="Week 8" />
      </Tabs>
    )

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
            <EventsList temp="1"/>
          </div>
          <div className={this.props.classes.slide}>
            <EventsList temp="2"/>
          </div>
          <div className={this.props.classes.slide}>
            {'Week 3'}
          </div>
          <div className={this.props.classes.slide}>
            {'Week 4'}
          </div>
          <div className={this.props.classes.slide}>
            {'Week 5'}
          </div>
          <div className={this.props.classes.slide}>
            {'Week 6'}
          </div>
          <div className={this.props.classes.slide}>
            {'Week 7'}
          </div>
          <div className={this.props.classes.slide}>
            {'Week 8'}
          </div>
        </SwipeableViews>
      </AppNavContainer>
    );
  }
}

export default withStyles(styles)(Events);
