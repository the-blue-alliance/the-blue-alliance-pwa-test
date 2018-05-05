import { connect } from 'react-redux'
import TBABottomNav from '../components/TBABottomNav'


const mapStateToProps = (state, props) => ({
  navValue: state.getIn(['appState', 'navValue']),
})

const mapDispatchToProps = (dispatch) => ({
})

const TBABottomNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBABottomNav)

export default TBABottomNavContainer
