import { connect } from 'react-redux'
import TBABottomNav from '../components/TBABottomNav'


const mapStateToProps = (state, props) => ({
  bottomNavValue: state.getIn(['appNav', 'bottomNavValue']),
});

const mapDispatchToProps = (dispatch) => ({
});

const TBABottomNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBABottomNav);

export default TBABottomNavContainer;
