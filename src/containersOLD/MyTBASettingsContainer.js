import { connect } from 'react-redux'
import { getFavorites } from '../selectors/UserFavoriteSelectors'
import MyTBASettings from '../components/MyTBASettings'

const mapStateToProps = (state, props) => ({
  favorites: getFavorites(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const MyTBASettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTBASettings)

export default MyTBASettingsContainer
