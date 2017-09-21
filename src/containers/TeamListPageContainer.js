import { connect } from 'react-redux'
import { fetchTeamListAll } from '../actions'
import { getTeamsByTab } from '../selectors/TeamListPageSelectors'
import TeamListPage from '../components/TeamListPage'

const mapStateToProps = (state, props) => ({
  teamsByTab: getTeamsByTab(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamListAll: () => dispatch(fetchTeamListAll()),
})

const TeamListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamListPage)

export default TeamListPageContainer;
