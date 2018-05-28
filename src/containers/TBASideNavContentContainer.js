import { connect } from 'react-redux'
import { toggleAPI, toggleIDB } from '../actions'
import { withFirebase } from 'react-redux-firebase'
import TBASideNavContent from '../components/TBASideNavContent'


const mapStateToProps = (state, props) => ({
  navValue: state.getIn(['appState', 'navValue']),
  apiEnabled: state.getIn(['appState', 'apiEnabled']),
  idbEnabled: state.getIn(['appState', 'idbEnabled']),
  auth: state.get('firebase').auth,
});

const mapDispatchToProps = (dispatch) => ({
  toggleAPI: () => dispatch(toggleAPI()),
  toggleIDB: () => dispatch(toggleIDB()),
});

const TBASideNavContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBASideNavContent);

export default withFirebase(TBASideNavContentContainer);
