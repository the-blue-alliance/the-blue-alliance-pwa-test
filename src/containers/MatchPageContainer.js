import { connect } from 'react-redux'
import { resetPage, setBottomNav, fetchMatchInfo } from '../actions'
import MatchPage from '../components/MatchPage'
import { getMatchKey, getMatch } from '../selectors/MatchPageSelectors'


const mapStateToProps = (state, props) => ({
  // States
  // Params
  matchKey: getMatchKey(state, props),
  // Data
  matchObj: getMatch(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchMatchInfo: (matchKey) => dispatch(fetchMatchInfo(matchKey)),
});

const MatchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPage)

export default MatchPageContainer;
