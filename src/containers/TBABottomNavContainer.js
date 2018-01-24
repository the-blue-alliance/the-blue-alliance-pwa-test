import { connect } from 'react-redux'
import TBABottomNav from '../components/TBABottomNav'


const mapStateToProps = (state, props) => ({
  bottomNavValue: state.getIn(['appState', 'bottomNavValue']),
});

const mapDispatchToProps = (dispatch) => ({
});

const TBABottomNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBABottomNav);

export default TBABottomNavContainer;
