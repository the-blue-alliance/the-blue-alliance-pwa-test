import { connect } from 'react-redux'
import { fetchYearEvents } from '../actions'
import { getSortedEvents } from '../selectors/EventListPageSelectors'
import EventListPage from '../components/EventListPage.js'


const mapStateToProps = (state, props) => ({
  sortedEvents: getSortedEvents(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
});

const EventListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListPage);

export default EventListPageContainer;
