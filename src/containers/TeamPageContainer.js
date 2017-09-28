import { connect } from 'react-redux'
import { fetchTeamInfo, fetchTeamYearEvents } from '../actions'
import TeamPage from '../components/TeamPage'


const mapStateToProps = (state, props) => ({
  team: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'team', 'data']),
  teamYearEvents: state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'teamYearEvents', 'data']),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
});

const TeamPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage)

export default TeamPageContainer;
