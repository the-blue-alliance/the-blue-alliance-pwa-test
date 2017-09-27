import { connect } from 'react-redux'
import { resetPage } from '../actions'
import MatchPage from '../components/MatchPage.js'


const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: (key) => dispatch(resetPage(key)),
});

const MatchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPage)

export default MatchPageContainer;
