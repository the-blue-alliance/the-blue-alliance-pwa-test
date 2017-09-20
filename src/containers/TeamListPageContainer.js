import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toJS } from './to-js'
import { fetchTeamListAll } from '../actions'
import { getTeamsByTab } from '../selectors/TeamListPageSelectors'
import TeamListPage from '../components/TeamListPage'

const mapStateToProps = (state, props) => ({
  teamsByTab: getTeamsByTab(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamListAll: () => dispatch(fetchTeamListAll()),
})

const TeamListPageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(TeamListPage)));

export default TeamListPageContainer;
