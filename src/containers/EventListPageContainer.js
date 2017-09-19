import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchYearEvents } from '../actions'
import EventListPage from '../components/EventListPage.js'


const mapStateToProps = (state, ownProps) => ({
  eventsByYear: state.eventsByYear,
});

const mapDispatchToProps = (dispatch) => ({
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
});

const EventListPageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListPage));

export default EventListPageContainer;
