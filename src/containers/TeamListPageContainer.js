import { connect } from 'react-redux'
import { resetPage, fetchTeamListAll } from '../actions'
import { getAllTeams } from '../selectors/TeamListPageSelectors'
import TeamListPage from '../components/TeamListPage'

const mapStateToProps = (state, props) => ({
  allTeams: getAllTeams(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: () => dispatch(resetPage()),
  fetchTeamListAll: () => dispatch(fetchTeamListAll()),
})

const TeamListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamListPage)

export default TeamListPageContainer;
