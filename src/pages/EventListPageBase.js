// General
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Set } from 'immutable'

// Actions
import { push } from 'connected-react-router'
import { resetPage, setPageState, setNav, fetchYearEvents } from '../actions'

// Selectors
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import { getFilteredGroupedEvents } from '../selectors/EventListPageSelectors'

// Components
import Hidden from '@material-ui/core/Hidden'

// TBA Components
import EventListPageDesktop from './EventListPageDesktop'
import EventListPageMobile from './EventListPageMobile'

const mapStateToProps = (state, props) => ({
  // Params
  year: getYear(state, props),
  // States
  districtFilters: getCurrentPageState(state, props).get('districtFilters'),
  yearMenuOpen: getCurrentPageState(state, props).get('yearMenuOpen'),
  // Data
  groupedEvents: getFilteredGroupedEvents(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  pushHistory: (path) => dispatch(push(path)),
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
})

class EventListPageBase extends PureComponent {
  reset = props => {
    props.resetPage({
      activeEventGroup: null,
      filterDialogOpen: false,
      districtFilters: Set(),
      yearMenuOpen: false,
    })
    // Fetch data
    this.refreshFunction(props)
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setNav('events')
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

    const { year, districtFilters } = this.props

    // Compute valid years
    let validYears = []
    for (let y=2018; y>=1992; y--) {
      validYears.push(y)
    }

    const filterCount = districtFilters ? districtFilters.size : 0

    return (
      <React.Fragment>
        <Hidden smDown>
          <EventListPageDesktop
            documentTitle={`${year} Events`}
            year={year}
            validYears={validYears}
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            setPageState={this.props.setPageState}
            pushHistory={this.props.pushHistory}
            groupedEvents={this.props.groupedEvents}
            filterCount={filterCount}
            yearMenuOpen={this.props.yearMenuOpen}
          />
        </Hidden>
        <Hidden mdUp>
          <EventListPageMobile
            documentTitle={`${year} Events`}
            year={year}
            validYears={validYears}
            refreshFunction={this.refreshFunction}
            filterFunction={this.filterFunction}
            setYearMenuOpen={this.setYearMenuOpen}
            setPageState={this.props.setPageState}
            pushHistory={this.props.pushHistory}
            groupedEvents={this.props.groupedEvents}
            filterCount={filterCount}
            yearMenuOpen={this.props.yearMenuOpen}
          />
        </Hidden>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListPageBase)
