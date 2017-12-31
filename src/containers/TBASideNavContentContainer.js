import { connect } from 'react-redux'
import { toggleOffline } from '../actions'
import TBASideNavContent from '../components/TBASideNavContent'


const mapStateToProps = (state, props) => ({
  offlineOnly: state.getIn(['appNav', 'offlineOnly']),
});

const mapDispatchToProps = (dispatch) => ({
  toggleOffline: () => dispatch(toggleOffline()),
});

const TBASideNavContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBASideNavContent);

export default TBASideNavContentContainer;
