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
  state = {isFreshPage: true}

  constructor(props) {
    super(props)
    props.setBottomNav('events')
    props.resetPage({
      activeEventGroup: 'week-1',
      filterDialogOpen: false,
      districtFilters: Set(),
      // tabIdx: 0,
      // eventFilterOpen: false,
      // yearPickerOpen: false,
      // filters: [],
    })
    // this.state = {
    //   isFirstRender: true,
    // }
  }

  componentDidMount() {
    this.refreshFunction()
    // Rerender without cascading
    setTimeout(() => this.setState({ isFreshPage: false }), 0)
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextProps.sortedEvents !== this.props.sortedEvents) {
  //     this.setState({ isFirstRender: true })
  //   }
  // }

  // componentDidUpdate() {
  //   // Rerender without cascading
  //   setTimeout(() => this.setState({ isFirstRender: false }), 0)
  // }

  refreshFunction = () => {
    this.props.fetchYearEvents(this.props.year)
  }

  filterFunction = () => {
    this.props.setPageState({ filterDialogOpen: true })
  }

  render() {
    console.log("Render EventListPageBase")

    return (
      <div>
        <Hidden smDown>
          <EventListPageDesktop
            documentTitle={`${this.props.year} Events`}
            isFreshPage={this.state.isFreshPage}
            refreshFunction={this.refreshFunction}
            pageState={this.props.pageState}
            setPageState={this.props.setPageState}
            year={this.props.year}
            groupedEvents={this.props.groupedEvents}
          />
        </Hidden>
        <Hidden mdUp>
          <EventListPageMobile
            documentTitle={`${this.props.year} Events`}
            isFreshPage={this.state.isFreshPage}
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
