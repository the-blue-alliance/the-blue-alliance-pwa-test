import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import TBAAppBar from '../components/TBAAppBar'


const mapStateToProps = (state, props) => ({
  isLoading: state.getIn(['appState', 'loadingCount']) > 0,
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
})

const TBAAppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBAAppBar)

export default TBAAppBarContainer
