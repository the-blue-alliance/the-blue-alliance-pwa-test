import { connect } from 'react-redux'
import { resetPage, setBottomNav, fetchEventInfo, fetchMatchInfo } from '../actions'
import MatchPage from '../components/MatchPage'
import { getEventKey, getEvent, getMatchKey, getMatch } from '../selectors/MatchPageSelectors'


const mapStateToProps = (state, props) => ({
  // States
  // Params
  eventKey: getEventKey(state, props),
  matchKey: getMatchKey(state, props),
  // Data
  event: getEvent(state, props),
  matchObj: getMatch(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchMatchInfo: (matchKey) => dispatch(fetchMatchInfo(matchKey)),
});

const MatchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPage)

export default MatchPageContainer;
