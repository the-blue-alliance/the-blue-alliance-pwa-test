import { connect } from 'react-redux'
import { resetPage, fetchYearEvents } from '../actions'
import { getSortedEvents } from '../selectors/EventListPageSelectors'
import EventListPage from '../components/EventListPage.js'


const mapStateToProps = (state, props) => ({
  sortedEvents: getSortedEvents(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (key) => dispatch(resetPage(key)),
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
});

const EventListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListPage);

export default EventListPageContainer;
