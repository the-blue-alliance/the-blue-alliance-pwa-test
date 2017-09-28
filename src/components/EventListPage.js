import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';

import TBAPageContainer from '../containers/TBAPageContainer'
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

let CMP_TYPES = new Set()
CMP_TYPES.add(3)
CMP_TYPES.add(4)

let SEASON_TYPES = new Set()
SEASON_TYPES.add(0)
SEASON_TYPES.add(1)
SEASON_TYPES.add(2)
SEASON_TYPES.add(5)

class EventListPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isFirstRender: true,
      tabIdx: 0,
      eventFilterOpen: false,
      yearPickerOpen: false,
      filters: [],
    }
    this.resetTabMem()
  }

  resetTabMem = ()  => {
    this.tabs = []
    this.lastEvents = null
    this.tabContentList = []
  }

  componentDidMount() {
    this.refreshFunction()
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.sortedEvents !== this.props.sortedEvents) {
      this.setState({ isFirstRender: true })
    }
  }

  componentDidUpdate() {
    // Rerender without cascading
    setTimeout(() => this.setState({ isFirstRender: false }), 0)
  }

  refreshFunction = () => {
    this.props.fetchYearEvents(2017)
  }

  filterFunction = () => {
    this.setState({ eventFilterOpen: true })
  }

  tabHandleChangeIndex = tabIdx => {
    this.setState({tabIdx});
  }

  tabHandleChange = (event, tabIdx) => {
    this.setState({tabIdx});
  }

  eventFilterHandleRequestClose = () => {
    this.setState({ eventFilterOpen: false })
  }

  yearPickerHandleRequestClose = value => {
    this.setState({ yearPickerValue: value, yearPickerOpen: false })
  }

  handleToggle = value => () => {
    const { filters } = this.state;
    const currentIndex = filters.indexOf(value);
    const newFilters = [...filters];

    if (currentIndex === -1) {
      newFilters.push(value);
    } else {
      newFilters.splice(currentIndex, 1);
    }

    this.setState({
      filters: newFilters,
      isFirstRender: true,
    });
  };

  computeTabs = events => {
    this.tabs = []
    let tabIdx = -1
    let lastTabName = null
    let tabName = null
    let tabEvents = []
    events.forEach(event => {
      // Create tabs
      if (CMP_TYPES.has(event.get('event_type'))) {
        if (event.get('year') >= 2017) {
          tabName = `${event.get('city')} Championship`
        } else {
          tabName = 'Championship'
        }
      } else if (event.get('week') != null) {
        tabName = `Week ${event.get('week') + 1}`
      } else if (event.get('event_type') === 100) {
        tabName = 'Preseason'
      } else {
        tabName = 'Offseason'
      }

      if (tabName !== lastTabName) {
        tabIdx++
        this.tabs.push(<Tab key={tabIdx} label={tabName} />)
        lastTabName = tabName
      }

      if (tabEvents[tabIdx]) {
        tabEvents[tabIdx].push(event)
      } else {
        tabEvents[tabIdx] = [event]
      }
    })
    // Create tab content
    this.tabContentList = tabEvents.map((events, i) => {
      if (!this.state.isFirstRender || i === this.state.tabIdx) {
        return <EventsList key={i} events={events} />
      } else {
        return <div key={i} />
      }
    })
  }

  render() {
    console.log("Render EventListPage")

    let events = this.props.sortedEvents
    let filters = {
    }
    if (events) {
      events.forEach(event => {
        if (event.get('district') && !filters[event.getIn(['district', 'display_name'])]) {
          filters[event.getIn(['district', 'display_name'])] = event.getIn(['district', 'abbreviation'])
        }
      })

      if (this.state.filters.length > 0) {
        events = events.filter(event => this.state.filters.indexOf(event.getIn(['district', 'abbreviation'])) !== -1)
      }

      // Only compute if events changed or isFirstRender changed
      if (!events.equals(this.lastEvents) || this.state.isFirstRender !== this.lastIsFirstRender) {
        this.computeTabs(events)
        this.lastEvents = events
        this.lastIsFirstRender = this.state.isFirstRender
      }
    } else {
      this.resetTabMem()
    }

    return (
      <TBAPageContainer
        title='Events'
        refreshFunction={this.refreshFunction}
        filterFunction={this.filterFunction}
        tabs={
          <Tabs
            value={this.state.tabIdx}
            onChange={this.tabHandleChange}
            indicatorColor="white"
            scrollable
            scrollButtons="auto"
          >
            {this.tabs}
          </Tabs>
        }
      >
      {/*<AppNavContainer
        title={'Events'}
        // title={
        //   <Button
        //     color="contrast"
        //     onClick={() => this.setState({ yearPickerOpen: true })}
        //   >
        //     2017 Events
        //   </Button>
        // }
        refreshFunction={this.refreshFunction}
        filterFunction={this.filterFunction}
        tabs={
          <Tabs
            value={this.state.tabIdx}
            onChange={this.tabHandleChange}
            indicatorColor="white"
            scrollable
            scrollButtons="auto"
          >
            {this.tabs}
          </Tabs>
        }
      >*/}
        <EventFilterDialog
          open={this.state.eventFilterOpen}
          onRequestClose={this.eventFilterHandleRequestClose}
          eventFilters={filters}
          handleToggle={this.handleToggle}
          activeFilters={this.state.filters}
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
          {this.tabContentList}
        </SwipeableViews>
      </TBAPageContainer>
    )
  }
}

export default withStyles(styles)(EventListPage);
