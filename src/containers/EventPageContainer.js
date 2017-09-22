import { connect } from 'react-redux'
import { fetchEventInfo, fetchEventTeams } from '../actions'
import EventPage from '../components/EventPage.js'


const mapStateToProps = (state, props) => ({
  event: state.getIn(['page', 'event', 'data']),
  eventTeams: state.getIn(['page', 'eventTeams', 'data']),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
});

const EventPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default EventPageContainer;
