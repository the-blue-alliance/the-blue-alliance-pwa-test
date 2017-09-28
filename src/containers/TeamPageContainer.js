import { connect } from 'react-redux'
import { resetPage, setPageState, fetchTeamInfo, fetchTeamYearEvents } from '../actions'
import { getYear } from '../selectors/CommonPageSelectors'
import { getTeamNumber } from '../selectors/TeamPageSelectors'
import TeamPage from '../components/TeamPage'


const mapStateToProps = (state, props) => ({
  // Params
  teamNumber: getTeamNumber(state, props),
  year: getYear(state, props),
  // States
  team: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'team', 'data']),
  teamYearEvents: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'teamYearEvents', 'data']),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: () => dispatch(resetPage()),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
});

const TeamPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)

export default TeamPageContainer;
