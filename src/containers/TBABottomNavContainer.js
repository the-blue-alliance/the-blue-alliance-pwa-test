import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import TBABottomNav from '../components/TBABottomNav'


const mapStateToProps = (state, props) => ({
  navValue: state.getIn(['appState', 'navValue']),
})

const mapDispatchToProps = (dispatch) => ({
  push: (path) => dispatch(push(path)),
})

const TBABottomNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBABottomNav)

export default TBABottomNavContainer
