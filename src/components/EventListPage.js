import React, { PureComponent } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Tabs, { Tab } from 'material-ui/Tabs';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Scrollspy from 'react-scrollspy'

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'
import EventsList from './EventsList'
import EventsList2 from './EventsList2'
import EventFilterDialog from './EventFilterDialog'
import YearPickerDialog from './YearPickerDialog'

const styles = theme => ({
  slideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  sideNav: {
    position: 'fixed',
    maxWidth: 150,
  },
  sideNavSectionContainer: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    '& a:hover': {
      textDecoration: 'none',
      backgroundColor: '#dddddd',
      borderRight: `1px solid ${theme.palette.primary.main}`,
    }
  },
  sideNavSection: {
    '& > a': {
      display: 'block',
      padding: '5px 20px',
    },
    '& > ul': {
      display: 'none',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    }
  },
  sideNavSectionActive: {
    '& > a': {
      fontWeight: 'bold',
      borderRight: `1px solid ${theme.palette.primary.main}`,
    },
    '& > ul': {
      display: 'block',
    }
  },
  sideNavItem: {
    paddingLeft: 10,
    '& > a': {
      display: 'block',
      fontSize: 14,
      padding: '5px 20px',
    },
  },
  sideNavItemActive: {
    '& > a': {
      fontWeight: 'bold',
      borderRight: `1px solid ${theme.palette.primary.main}`,
    },
  },
  eventGroupCard: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
})

class EventListTab extends PureComponent {
  render() {
    const {tabIdx, tabName, ...otherProps} = this.props
    return <Tab key={tabIdx} label={tabName} {...otherProps} />
  }
}

class EventListPage extends PureComponent {
  constructor(props) {
    super(props)
    props.setBottomNav('events')
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
    this.tabs = events.map((event, i) => <EventListTab key={i} label={event.get('label')} />)
    this.tabContentList = events.map((events, i) => {
      if (!this.state.isFirstRender || i === this.props.pageState.get('tabIdx')) {
        return <EventsList key={i} events={events.get('events')} />
      } else {
        return <div key={i} />
      }
    })

  }

  render() {
    console.log("Render EventListPage")

    let events = this.props.groupedEvents

     let filters = {
    }
    if (events) {
      // events.forEach(event => {
      //   if (event.get('district') && !filters[event.getIn(['district', 'display_name'])]) {
      //     filters[event.getIn(['district', 'display_name'])] = event.getIn(['district', 'abbreviation'])
      //   }
      // })

      // if (this.props.pageState.get('filters') && this.props.pageState.get('filters').size > 0) {
      //   events = events.filter(event => this.props.pageState.get('filters').indexOf(event.getIn(['district', 'abbreviation'])) !== -1)
      // }

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
            contentRef={el => this.contentRef = el}
            restoreScroll={this.state.isFirstRender}
          >
            <ResponsiveLayout>
              <Grid container spacing={24}>
                <Grid item xs={3} lg={2}>
                  <div className={this.props.classes.sideNav}>
                    <h1>{`${2017} Events`}</h1>
                    {this.contentRef &&
                      <Scrollspy
                        rootEl={`.${this.contentRef.className}`}
                        items={['official', 'unofficial']}
                        currentClassName={this.props.classes.sideNavSectionActive}
                        className={this.props.classes.sideNavSectionContainer}
                      >
                        <li className={this.props.classes.sideNavSection}>
                          <a href="#official">Official Events</a>
                          <Scrollspy
                            rootEl={`.${this.contentRef.className}`}
                            items={events.filter(group => group.get('isOfficial')).map(group => group.get('label')).toJS()}
                            currentClassName={this.props.classes.sideNavItemActive}
                          >
                            {events.filter(group => group.get('isOfficial')).map(group => {
                              return (
                                <li key={group.get('label')} className={this.props.classes.sideNavItem}>
                                  <a href={`#${group.get('label')}`}>{group.get('label')}</a>
                                </li>
                              )
                            })}
                          </Scrollspy>
                        </li>
                        <li className={this.props.classes.sideNavSection}>
                          <a href="#unofficial">Unofficial Events</a>
                          <Scrollspy
                            rootEl={`.${this.contentRef.className}`}
                            items={events.filter(group => !group.get('isOfficial')).map(group => group.get('label')).toJS()}
                            currentClassName={this.props.classes.sideNavItemActive}
                          >
                            {events.filter(group => !group.get('isOfficial')).map(group => {
                              return (
                                <li key={group.get('label')} className={this.props.classes.sideNavItem}>
                                  <a href={`#${group.get('label')}`}>{group.get('label')}</a>
                                </li>
                              )
                            })}
                          </Scrollspy>
                        </li>
                      </Scrollspy>
                    }
                  </div>
                </Grid>
                <Grid item xs={9} lg={10}>
                  <div id='official'>
                    <h1>Official Events</h1>
                    {events.filter(group => group.get('isOfficial')).map(group => {
                      return (
                        <div key={group.get('label')} id={group.get('label')}>
                          <h2>{group.get('label')}</h2>
                          <Paper className={this.props.classes.eventGroupCard} elevation={4}>
                            {group.get('events').map(event => {
                              return <div key={event.key}><Link to={`/event/${event.key}`}>{event.name}</Link></div>
                            })}
                          </Paper>
                        </div>
                      )
                    })}
                  </div>
                  <div id='unofficial'>
                    <h1>Unofficial Events</h1>
                    {events.filter(group => !group.get('isOfficial')).map(group => {
                      return (
                        <div key={group.get('label')} id={group.get('label')}>
                          <h2>{group.get('label')}</h2>
                          <Paper className={this.props.classes.eventGroupCard} elevation={4}>
                            {group.get('events').map(event => {
                              return <div key={event.key}><Link to={`/event/${event.key}`}>{event.name}</Link></div>
                            })}
                          </Paper>
                        </div>
                      )
                    })}
                  </div>
                </Grid>
              </Grid>
            </ResponsiveLayout>
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
        {/*
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
        />*/}
      </div>
    )
  }
}

export default withStyles(styles)(EventListPage);
