import { connect } from 'react-redux'
import { resetPage, fetchTeamInfo, fetchTeamYearEvents } from '../actions'
import TeamPage from '../components/TeamPage'


const mapStateToProps = (state, props) => ({
  team: state.getIn(['page', 'team', 'data']),
  teamYearEvents: state.getIn(['page', 'teamYearEvents', 'data']),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: () => dispatch(resetPage()),
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
});

const TeamPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)

export default TeamPageContainer;
