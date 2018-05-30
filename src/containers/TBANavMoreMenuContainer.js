import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import TBANavMoreMenu from '../components/TBANavMoreMenu'

const mapStateToProps = (state, props) => ({
  navValue: state.getIn(['appState', 'navValue']),
  auth: state.get('firebase').auth,
});

const mapDispatchToProps = (dispatch) => ({
});

const TBANavMoreMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBANavMoreMenu);

export default withFirebase(TBANavMoreMenuContainer);
