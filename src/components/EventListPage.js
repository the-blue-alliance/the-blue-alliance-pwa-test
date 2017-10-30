import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';

import TBAPageContainer from '../containers/TBAPageContainer'
import EventsList from './EventsList'
import EventsList2 from './EventsList2'
import EventFilterDialog from './EventFilterDialog'
import YearPickerDialog from './YearPickerDialog'

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflowY: 'auto',
  },
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 48px',
  },
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

class EventListTab extends PureComponent {
  render() {
    const {tabIdx, tabName, ...otherProps} = this.props
    return <Tab key={tabIdx} label={tabName} {...otherProps} />
  }
}

class EventListPage extends PureComponent {
  constructor(props) {
    super(props)
    props.resetPage({
      tabIdx: 0,
      eventFilterOpen: false,
      // yearPickerOpen: false,
      filters: [],
    })
    this.state = {
      isFirstRender: true,
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
    this.props.setPageState({ eventFilterOpen: true })
  }

  tabHandleChangeIndex = tabIdx => {
    this.props.setPageState({tabIdx});
  }

  tabHandleChange = (event, tabIdx) => {
    this.props.setPageState({tabIdx});
  }

  eventFilterHandleRequestClose = () => {
    this.props.setPageState({ eventFilterOpen: false })
  }

  // yearPickerHandleRequestClose = value => {
  //   this.props.setPageState({ yearPickerValue: value, yearPickerOpen: false })
  // }

  handleToggle = value => () => {
    const filters = this.props.pageState.get('filters');
    const currentIndex = filters.indexOf(value);
    const newFilters = [...filters];

    if (currentIndex === -1) {
      newFilters.push(value);
    } else {
      newFilters.splice(currentIndex, 1);
    }

    this.props.setPageState({
      filters: newFilters,
    })
    this.setState({
      isFirstRender: true,
    })
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
        this.tabs.push(<EventListTab key={tabIdx} label={tabName} />)
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
      if (!this.state.isFirstRender || i === this.props.pageState.get('tabIdx')) {
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

      if (this.props.pageState.get('filters') && this.props.pageState.get('filters').size > 0) {
        events = events.filter(event => this.props.pageState.get('filters').indexOf(event.getIn(['district', 'abbreviation'])) !== -1)
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
      <div>
        <Hidden smDown>
          <TBAPageContainer
            documentTitle="Events"
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
          >
            <div className={this.props.classes.container} ref="container">
              <div className={this.props.classes.root}>
                <Grid container spacing={24}>
                  <Grid item xs={2}>
                    <p>Navigation stuff</p>
                  </Grid>
                  <Grid item xs={10}>
                    <h1>Events</h1>
                    {events && <EventsList2 events={events} el={this.refs.container}/>}
                  </Grid>
                </Grid>
            </div>
            </div>
          </TBAPageContainer>
        </Hidden>
        <Hidden mdUp>
          <TBAPageContainer
            title='Events'
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
            tabs={this.tabs.length !== 0 &&
              <Tabs
                value={this.props.pageState.get('tabIdx')}
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
            //     onClick={() => this.props.setPageState({ yearPickerOpen: true })}
            //   >
            //     2017 Events
            //   </Button>
            // }
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
            tabs={
              <Tabs
                value={this.props.pageState.get('tabIdx')}
                onChange={this.tabHandleChange}
                indicatorColor="white"
                scrollable
                scrollButtons="auto"
              >
                {this.tabs}
              </Tabs>
            }
          >*/}
            <SwipeableViews
              containerStyle={styles.slideContainer}
              index={this.props.pageState.get('tabIdx')}
              onChangeIndex={this.tabHandleChangeIndex}
            >
              {this.tabContentList}
            </SwipeableViews>
          </TBAPageContainer>
        </Hidden>
        <EventFilterDialog
          open={this.props.pageState.get('eventFilterOpen')}
          onRequestClose={this.eventFilterHandleRequestClose}
          eventFilters={filters}
          handleToggle={this.handleToggle}
          activeFilters={this.props.pageState.get('filters') ? this.props.pageState.get('filters') : []}
        />
        <YearPickerDialog
          selectedValue={this.props.pageState.yearPickerValue}
          open={this.props.pageState.yearPickerOpen}
          onRequestClose={this.yearPickerHandleRequestClose}
        />
      </div>
    )
  }
}

export default withStyles(styles)(EventListPage);
