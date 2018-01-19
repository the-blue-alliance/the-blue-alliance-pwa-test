import { connect } from 'react-redux'
import { resetPage, setPageState, setBottomNav, fetchTeamInfo, fetchTeamYearEvents, fetchTeamYearMatches } from '../actions'
import { getYear } from '../selectors/CommonPageSelectors'
import { getTeamNumber, getTeam, getSortedTeamYearEvents, getMatchesByEvent } from '../selectors/TeamPageSelectors'
import TeamPage from '../components/TeamPage'


const mapStateToProps = (state, props) => ({
  // Params
  teamNumber: getTeamNumber(state, props),
  year: getYear(state, props),
  // States
  // Data
  team: getTeam(state, props),
  teamYearEvents: getSortedTeamYearEvents(state, props),
  matchesByEvent: getMatchesByEvent(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: () => dispatch(resetPage()),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
  fetchTeamYearMatches: (teamNumber, year) => dispatch(fetchTeamYearMatches(teamNumber, year)),
});

const TeamPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)

export default TeamPageContainer;
