import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Teams from '../components/Teams'
import { setTeamList } from '../actions'
import { getPaginatedTeams } from '../selectors'

const mapStateToProps = (state, ownProps) => ({
  paginatedTeams: getPaginatedTeams(state.database),
});

const mapDispatchToProps = (dispatch) => ({
  setTeamList: (teams) => dispatch(setTeamList(teams)),
})

const TeamsContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams));

export default TeamsContainer;
