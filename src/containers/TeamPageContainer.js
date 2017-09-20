import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toJS } from './to-js'
import { fetchTeamInfo, fetchTeamYearEvents } from '../actions'
import { getTeam, getTeamYearEvents } from '../selectors/TeamPageSelectors'
import TeamPage from '../components/TeamPage'


const mapStateToProps = (state, props) => ({
  team: getTeam(state, props),
  teamYearEvents: getTeamYearEvents(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
});

const TeamPageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(TeamPage)));

export default TeamPageContainer;
