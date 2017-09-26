import { connect } from 'react-redux'
import { resetPage, fetchEventInfo, fetchEventMatches, fetchEventTeams } from '../actions'
import MatchPage from '../components/MatchPage.js'


const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch) => ({
  resetPage: () => dispatch(resetPage()),
});

const MatchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchPage)

export default MatchPageContainer;
