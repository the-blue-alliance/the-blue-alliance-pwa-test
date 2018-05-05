import { connect } from 'react-redux'
import { toggleAPI, toggleIDB } from '../actions'
import TBASideNavContent from '../components/TBASideNavContent'


const mapStateToProps = (state, props) => ({
  apiEnabled: state.getIn(['appState', 'apiEnabled']),
  idbEnabled: state.getIn(['appState', 'idbEnabled']),
});

const mapDispatchToProps = (dispatch) => ({
  toggleAPI: () => dispatch(toggleAPI()),
  toggleIDB: () => dispatch(toggleIDB()),
});

const TBASideNavContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBASideNavContent);

export default TBASideNavContentContainer;
