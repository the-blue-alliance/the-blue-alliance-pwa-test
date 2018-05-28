// General
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
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
import TBAHelmet from '../components/TBAHelmet'
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
  static fetchData({ store, params }) {
    return store.dispatch(fetchYearEvents(params.year ? params.year : 2018))
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

  componentDidMount() {
    this.props.resetPage({
      activeEventGroup: null,
      filterDialogOpen: false,
      districtFilters: Set(),
      yearMenuOpen: false,
    })
    this.props.setNav('events')

    // Fetch data async
    ReactDOM.unstable_deferredUpdates(() => this.refreshFunction())
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
        <TBAHelmet>
          <title>{`${year} Events`}</title>
          <meta name='description' content='TODO' />
        </TBAHelmet>
        <Hidden smDown>
          <EventListPageDesktop
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
