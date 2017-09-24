import { connect } from 'react-redux'
import { closeMobileDrawer } from '../actions'
import TBANavDrawer from '../components/TBANavDrawer'


const mapStateToProps = (state, props) => ({
  mobileDrawerOpen: state.getIn(['appNav', 'mobileDrawerOpen']),
});

const mapDispatchToProps = (dispatch) => ({
  closeMobileDrawer: () => dispatch(closeMobileDrawer()),
});

const TBANavDrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBANavDrawer);

export default TBANavDrawerContainer;
