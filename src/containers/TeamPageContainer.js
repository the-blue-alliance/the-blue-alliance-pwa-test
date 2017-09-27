import { connect } from 'react-redux'
import { resetPage, fetchTeamInfo, fetchTeamYearEvents } from '../actions'
import TeamPage from '../components/TeamPage'


const mapStateToProps = (state, props) => ({
  team: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'team', 'data']),
  teamYearEvents: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'teamYearEvents', 'data']),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (key) => dispatch(resetPage(key)),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
});

const TeamPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)

export default TeamPageContainer;
