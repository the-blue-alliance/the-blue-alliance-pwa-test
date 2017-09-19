import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchTeamListAll } from '../actions'
import { getTeamListTabs } from '../selectors'
import TeamListPage from '../components/TeamListPage'

const mapStateToProps = (state, ownProps) => ({
  teamListTabs: getTeamListTabs(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamListAll: () => dispatch(fetchTeamListAll()),
})

const TeamListPageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamListPage));

export default TeamListPageContainer;
