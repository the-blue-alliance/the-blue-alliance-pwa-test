import { connect } from 'react-redux'
import { resetPage, setPageState, fetchEventInfo, fetchEventMatches, fetchEventTeams } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getEventKey, getEventMatches, getEventTeams } from '../selectors/EventPageSelectors'
import EventPage from '../components/EventPage'


const mapStateToProps = (state, props) => ({
  // States
  tabIdx: getCurrentPageState(state, props).get('tabIdx'),
  // Params
  eventKey: getEventKey(state, props),
  // Data
  event: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'event', 'data']),
  matches: getEventMatches(state, props),
  teams: getEventTeams(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
});

const EventPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default EventPageContainer;
