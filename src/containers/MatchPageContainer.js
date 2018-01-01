import { connect } from 'react-redux'
import { setBottomNav } from '../actions'
import MatchPage from '../components/MatchPage'


const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setBottomNav: (value) => dispatch(setBottomNav(value)),
});

const MatchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPage)

export default MatchPageContainer;
