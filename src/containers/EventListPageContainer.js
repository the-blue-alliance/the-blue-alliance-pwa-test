import { connect } from 'react-redux'
import { fetchYearEvents } from '../actions'
import { getYearEventTabs } from '../selectors'
import EventListPage from '../components/EventListPage.js'


const mapStateToProps = (state, ownProps) => ({
  yearEventTabs: getYearEventTabs(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchYearEvents: (year) => dispatch(fetchYearEvents(year)),
});

const EventListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListPage);

export default EventListPageContainer;
