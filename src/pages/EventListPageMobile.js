import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'

import ButtonBase from 'material-ui/ButtonBase'
import { CircularProgress } from 'material-ui/Progress'
import EventIcon from 'material-ui-icons/Event'
import Icon from 'material-ui/Icon'
import Menu, { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'

import TBAPageContainer from '../containers/TBAPageContainer'
import GroupedEventTabs from '../components/GroupedEventTabs'
import EventsList2 from '../components/EventsList2'
import EventFilterDialogContainer from '../containers/EventFilterDialogContainer'
import ScrollRestoreContainer from '../containers/ScrollRestoreContainer'

const styles = theme => ({
  yearSelector: {
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  zeroDataContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  zeroDataIcon: {
    width: '25%',
    height: 'auto',
    margin: '0 auto',
  },
  zeroDataSpinner: {
    margin: '0 auto',
  },
})

class EventListPageMobile extends PureComponent {
  state = {
    fastRender: true,
    yearMenuAnchorEl: null,
  }
  tabContents = []
  tabRefs = {}

  tabHandleChangeIndex = index => {
    this.props.setPageState({activeEventGroup: this.props.groupedEvents.get(index).get('slug')});
  }

  computeTabContents = (groupedEvents, fastRender) => {
    this.tabContents = groupedEvents.map((group) => {
      const slug = group.get('slug')
      if (!fastRender || slug === this.props.pageState.get('activeEventGroup')) {
        // return <EventsList2 key={slug} events={group.get('events')} />
        return (
          <ScrollRestoreContainer
            key={slug}
            contentRef={(r) => this.tabRefs[slug] = r}
            scrollId={slug}
            className={this.props.classes.scrollContainer}
          >
            {/*<EventsList2 key={slug} events={group.get('events')} scrollElement={this.tabRefs[slug]}/>*/}
            hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2<br/>2
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
            <br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi<br/>hi
          </ScrollRestoreContainer>
        )
      } else {
        return <div key={slug} />
      }
    }).toJS()
  }

  handleYearOpen = event => {
    this.setState({ yearMenuAnchorEl: event.currentTarget });
    this.props.setYearMenuOpen(true)
  }

  handleYearSelect = year => {
    this.props.setYearMenuOpen(false)
    if (year !== this.props.year) {
      this.props.history.push(`/events/${year}`)
    }
  }

  componentWillMount() {
    this.computeTabContents(this.props.groupedEvents, this.state.fastRender)
  }

  componentDidMount() {
    // Render without cascading
    setTimeout(() => this.setState({ fastRender: false }), 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.groupedEvents !== nextProps.groupedEvents) {
      this.setState({ fastRender: true })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.groupedEvents !== nextProps.groupedEvents) {
      this.computeTabContents(nextProps.groupedEvents, this.state.fastRender)
    }
  }

  componentDidUpdate() {
    // Render without cascading
    setTimeout(() => this.setState({ fastRender: false }), 0)
  }

  render() {
    console.log("Render EventListPageMobile")

    const { classes, year, groupedEvents, isLoading, pageState } = this.props

    // Build group -> index map
    let groupToIndex = {}
    groupedEvents.forEach((group, index) => {
      groupToIndex[group.get('slug')] = index
    })

    // Compute valid years
    let validYears = []
    for (let y=2018; y>=1992; y--) {
      validYears.push(y)
    }

    const hasEvents = groupedEvents.size !== 0

    return (
      <TBAPageContainer
        history={this.props.history}
        documentTitle={this.props.documentTitle}
        title={
          <ButtonBase
            className={classes.yearSelector}
            onClick={this.handleYearOpen}
          >
            <Typography type='title' color='inherit'>
              {`${year} Events`}
            </Typography>
            <Icon>arrow_drop_down</Icon>
          </ButtonBase>
        }
        refreshFunction={this.props.refreshFunction}
        filterFunction={this.props.filterFunction}
        filterCount={pageState.get('districtFilters').size}
        tabs={hasEvents &&
          <GroupedEventTabs
            groupedEvents={groupedEvents}
            activeGroup={pageState.get('activeEventGroup')}
            setPageState={this.props.setPageState}
          />
        }
      >
        {hasEvents ?
          <SwipeableViews
            containerStyle={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
            index={groupToIndex[this.props.pageState.get('activeEventGroup')]}
            onChangeIndex={this.tabHandleChangeIndex}
          >
            {this.tabContents}
          </SwipeableViews>
          :
          <div className={classes.zeroDataContainer}>
            {isLoading ?
              <CircularProgress color='secondary' size='25%' className={classes.zeroDataSpinner} />
              :
              <EventIcon className={classes.zeroDataIcon} />
            }
            <Typography type='subheading'>{isLoading ? 'Events loading' : 'No events found'}</Typography>
          </div>
        }
        <EventFilterDialogContainer year={year} />
        <Menu
          anchorEl={this.state.yearMenuAnchorEl}
          open={this.props.pageState.get('yearMenuOpen')}
          onClose={() => this.props.setYearMenuOpen(false)}
        >
          {validYears.map(y =>
            <MenuItem
              key={y}
              selected={y === year}
              onClick={() => this.handleYearSelect(y)}
            >
              {y} Events
            </MenuItem>
          )}
        </Menu>
      </TBAPageContainer>
    )
  }
}

EventListPageMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  documentTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  filterFunction: PropTypes.func.isRequired,
  setYearMenuOpen: PropTypes.func.isRequired,
  pageState: ImmutablePropTypes.map.isRequired,
  setPageState: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  groupedEvents: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventListPageMobile)
