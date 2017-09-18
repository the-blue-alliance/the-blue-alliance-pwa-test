import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchTeamInfo, fetchTeamYearEvents } from '../actions'
import TeamPage from '../components/TeamPage.js'


const mapStateToProps = (state, ownProps) => ({
  infoByTeam: state.infoByTeam,
  eventsByTeamByYear: state.eventsByTeamByYear,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamInfo: (teamNumber) => dispatch(fetchTeamInfo(teamNumber)),
  fetchTeamYearEvents: (teamNumber, year) => dispatch(fetchTeamYearEvents(teamNumber, year)),
});

const TeamPageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPage));

export default TeamPageContainer;
