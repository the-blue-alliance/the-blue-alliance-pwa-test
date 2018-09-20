import { connect } from 'react-redux'
import { toggleTheme, toggleAPI, toggleIDB } from '../actions'
import { withFirebase } from 'react-redux-firebase'
import TBASideNav from '../components/TBASideNav'


const mapStateToProps = (state, props) => ({
  navValue: state.getIn(['appState', 'navValue']),
  darkTheme: state.getIn(['appState', 'darkTheme']),
  apiEnabled: state.getIn(['appState', 'apiEnabled']),
  idbEnabled: state.getIn(['appState', 'idbEnabled']),
  auth: state.get('firebase').auth,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTheme: () => dispatch(toggleTheme()),
  toggleAPI: () => dispatch(toggleAPI()),
  toggleIDB: () => dispatch(toggleIDB()),
});

const TBASideNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBASideNav);

export default withFirebase(TBASideNavContainer);
