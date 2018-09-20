import { connect } from 'react-redux'
import { resetPage, setPageState, setNav, fetchEventInfo, fetchEventMatches, fetchEventTeams, fetchEventRankings, fetchEventAlliances } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getEventKey, getEventModel, getSortedEventMatches, getSortedEventQualMatches, getSortedEventPlayoffMatches, getSortedEventTeams } from '../selectors/EventPageSelectors'
import EventPage from '../components/EventPage'


const mapStateToProps = (state, props) => ({
  // States
  tabIdx: getCurrentPageState(state, props).get('tabIdx'),
  // Params
  eventKey: getEventKey(state, props),
  // Data
  event: getEventModel(state, props),
  matches: getSortedEventMatches(state, props),
  qualMatches: getSortedEventQualMatches(state, props),
  playoffMatches: getSortedEventPlayoffMatches(state, props),
  teams: getSortedEventTeams(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setNav: (value) => dispatch(setNav(value)),
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
  fetchEventRankings: (eventKey) => dispatch(fetchEventRankings(eventKey)),
  fetchEventAlliances: (eventKey) => dispatch(fetchEventAlliances(eventKey)),
});

const EventPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage)

export default EventPageContainer;
