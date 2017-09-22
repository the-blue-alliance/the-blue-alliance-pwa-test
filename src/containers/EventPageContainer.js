import { connect } from 'react-redux'
import { resetPage, fetchEventInfo, fetchEventMatches, fetchEventTeams } from '../actions'
import EventPage from '../components/EventPage.js'


const mapStateToProps = (state, props) => ({
  event: state.getIn(['page', 'event', 'data']),
  matches: state.getIn(['page', 'matches', 'data']),
  teams: state.getIn(['page', 'teams', 'data']),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: () => dispatch(resetPage()),
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
});

const EventPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default EventPageContainer;
