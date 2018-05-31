import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import TBANav from '../components/TBANav'


const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

const TBANavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBANav)

export default withFirebase(TBANavContainer)
