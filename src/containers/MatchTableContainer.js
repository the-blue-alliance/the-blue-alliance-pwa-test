import { connect } from 'react-redux'
import { getFavoriteTeamKeys } from '../selectors/UserFavoriteSelectors'
import MatchTable from '../components/MatchTable'

const mapStateToProps = (state, props) => ({
  favoriteTeamKeys: getFavoriteTeamKeys(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const MatchTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchTable)

export default MatchTableContainer
