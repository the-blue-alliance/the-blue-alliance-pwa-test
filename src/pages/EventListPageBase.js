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
  isLoading: state.getIn(['appState', 'loadingCount']) > 0,
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
  reset = props => {
     // Set without overriding
    props.resetPage({
      restoreScroll: true,
      activeEventGroup: 'week-1',
      filterDialogOpen: false,
      districtFilters: Set(),
      yearMenuOpen: false,
    })
    // Override restoreScroll
    props.setPageState({restoreScroll: true})
    // Fetch data
    this.refreshFunction(props)
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setBottomNav('events')
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.reset(nextProps)
    }
  }

  refreshFunction = (props=this.props) => {
    this.props.fetchYearEvents(props.year)
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
            isLoading={this.props.isLoading}
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
            isLoading={this.props.isLoading}
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
            setYearMenuOpen={this.setYearMenuOpen}
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
