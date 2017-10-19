import { connect } from 'react-redux'
import MatchDialog from '../components/MatchDialog'
import { getMatch } from '../selectors/MatchPageSelectors'


const mapStateToProps = (state, props) => ({
  // States
  // Params
  // Data
  matchObj: getMatch(state, props),
});

const mapDispatchToProps = (dispatch) => ({
});

const MatchDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchDialog)

export default MatchDialogContainer;
