import { connect } from 'react-redux'
import { toggleMobileDrawer } from '../actions'
import TBANavBar from '../components/TBANavBar'


const mapStateToProps = (state, props) => ({
  isLoading: state.getIn(['appNav', 'loadingCount']) > 0,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMobileDrawer: () => dispatch(toggleMobileDrawer()),
});

const TBANavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBANavBar);

export default TBANavBarContainer;
