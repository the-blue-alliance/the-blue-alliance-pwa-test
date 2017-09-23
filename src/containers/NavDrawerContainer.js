import { connect } from 'react-redux'
import { toggleOffline } from '../actions'
import NavDrawer from '../components/NavDrawer'


const mapStateToProps = (state, props) => ({
  offlineOnly: state.getIn(['appBar', 'offlineOnly']),
});

const mapDispatchToProps = (dispatch) => ({
  toggleOffline: () => dispatch(toggleOffline()),
});

const NavDrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavDrawer);

export default NavDrawerContainer;
