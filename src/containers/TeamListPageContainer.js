import { connect } from 'react-redux'
import { resetPage, setPageState, setBottomNav, fetchTeamListAll } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getSortedTeams } from '../selectors/TeamListPageSelectors'
import TeamListPage from '../components/TeamListPage'

const mapStateToProps = (state, props) => ({
  // States
  pageState: getCurrentPageState(state, props),
  // Params
  // Data
  allTeams: getSortedTeams(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (defaultState) => dispatch(resetPage(defaultState)),
  setPageState: (pageState) => dispatch(setPageState(pageState)),
  setBottomNav: (value) => dispatch(setBottomNav(value)),
  fetchTeamListAll: () => dispatch(fetchTeamListAll()),
})

const TeamListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamListPage)

export default TeamListPageContainer;
