import { connect } from 'react-redux'
import TBAAppBar from '../components/TBAAppBar'


const mapStateToProps = (state, props) => ({
  isLoading: state.getIn(['appNav', 'loadingCount']) > 0,
});

const mapDispatchToProps = (dispatch) => ({
});

const TBAAppBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBAAppBar);

export default TBAAppBarContainer;
