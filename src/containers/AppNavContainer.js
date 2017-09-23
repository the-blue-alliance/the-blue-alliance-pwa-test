import { connect } from 'react-redux'
import { toggleOffline } from '../actions'
import AppNav from '../components/AppNav'


const mapStateToProps = (state, props) => ({
  isLoading: state.getIn(['appBar', 'loadingCount']) > 0,
  offlineOnly: state.getIn(['appBar', 'offlineOnly']),
});

const mapDispatchToProps = (dispatch) => ({
  toggleOffline: () => dispatch(toggleOffline()),
});

const AppNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav);

export default AppNavContainer;
