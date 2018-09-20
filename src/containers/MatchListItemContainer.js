import { connect } from 'react-redux'
import { getFavoriteTeamKeys } from '../selectors/UserFavoriteSelectors'
import MatchListItem from '../components/MatchList/MatchListItem'

const mapStateToProps = (state, props) => ({
  favoriteTeamKeys: getFavoriteTeamKeys(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const MatchListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchListItem)

export default MatchListItemContainer
