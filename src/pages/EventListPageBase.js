import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Set } from 'immutable'
import { resetPage, setPageState, setBottomNav, fetchYearEvents } from '../actions'
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import { getFilteredGroupedEvents } from '../selectors/EventListPageSelectors'
import Hidden from 'material-ui/Hidden'

import EventListPageDesktop from './EventListPageDesktop'
import EventListPageMobile from './EventListPageMobile'

const mapStateToProps = (state, props) => ({
  // States
  pageState: getCurrentPageState(state, props),
  // Params
  year: getYear(state, props),
  // Data
  groupedEvents: getFilteredGroupedEvents(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
})

class EventListPageBase extends PureComponent {
  defaultPageState = {
    restoreScroll: true,
    activeEventGroup: 'week-1',
    filterDialogOpen: false,
    districtFilters: Set(),
    yearMenuOpen: false,
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setBottomNav('events')
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.reset(this.props)
    }
  }

  reset = props => {
    props.resetPage(this.defaultPageState)     // Set without overriding
    props.setPageState({restoreScroll: true})  // Override restoreScroll
    this.refreshFunction()
  }

  refreshFunction = () => {
    this.props.fetchYearEvents(this.props.year)
  }

  filterFunction = () => {
    this.props.setPageState({ filterDialogOpen: true })
  }

  setYearMenuOpen = (isOpen) => {
    this.props.setPageState({ yearMenuOpen: isOpen })
  }

  render() {
    console.log("Render EventListPageBase")

    return (
      <div>
        <Hidden smDown>
          <EventListPageDesktop
            history={this.props.history}
            documentTitle={`${this.props.year} Events`}
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            pageState={this.props.pageState}
            setPageState={this.props.setPageState}
            year={this.props.year}
            groupedEvents={this.props.groupedEvents}
          />
        </Hidden>
        <Hidden mdUp>
          <EventListPageMobile
            history={this.props.history}
            documentTitle={`${this.props.year} Events`}
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
            pageState={this.props.pageState}
            setPageState={this.props.setPageState}
            year={this.props.year}
            groupedEvents={this.props.groupedEvents}
          />
        </Hidden>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListPageBase)
