import { connect } from 'react-redux'
import { setPageState } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import ScrollRestore from '../components/ScrollRestore.js'


const mapStateToProps = (state, props) => ({
  pageState: getCurrentPageState(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  setPageState: (pageState) => dispatch(setPageState(pageState)),
});

const ScrollRestoreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollRestore);

export default ScrollRestoreContainer;
