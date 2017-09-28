import { connect } from 'react-redux'
import { closeMobileDrawer, resetPage } from '../actions'
import TBAPage from '../components/TBAPage'


const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch) => ({
  closeMobileDrawer: () => dispatch(closeMobileDrawer()),
  resetPage: () => dispatch(resetPage()),
});

const TBAPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TBAPage);

export default TBAPageContainer;
