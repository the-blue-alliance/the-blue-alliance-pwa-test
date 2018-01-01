import { connect } from 'react-redux'
import { resetPage, setPageState, setBottomNav, fetchYearEvents } from '../actions'
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import { getSortedEvents } from '../selectors/EventListPageSelectors'
import EventListPage from '../components/EventListPage.js'


const mapStateToProps = (state, props) => ({
  // States
  pageState: getCurrentPageState(state, props),
  // Params
  year: getYear(state, props),
  // Data
  sortedEvents: getSortedEvents(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
});

const EventListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListPage);

export default EventListPageContainer;
