import { connect } from 'react-redux'
import { closeMobileDrawer } from '../actions'
import TBAPage from '../components/TBAPage'


const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch) => ({
  closeMobileDrawer: () => dispatch(closeMobileDrawer()),
});

const TBAPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBAPage);

export default TBAPageContainer;
