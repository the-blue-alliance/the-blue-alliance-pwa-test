import { connect } from 'react-redux'
import { fetchEventInfo, fetchEventMatches, fetchEventTeams } from '../actions'
import { getEventMatches, getEventTeams } from '../selectors/EventPageSelectors'
import EventPage from '../components/EventPage.js'


const mapStateToProps = (state, props) => ({
  event: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'event', 'data']),
  matches: getEventMatches(state, props),
  teams: getEventTeams(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
});

const EventPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default EventPageContainer;
