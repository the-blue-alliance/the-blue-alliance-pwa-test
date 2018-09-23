import { connect } from 'react-redux'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'

import PageState from '../components/PageState'

const mapStateToProps = (state, props) => ({
  currentPageState: getCurrentPageState(state, props),
});

const mapDispatchToProps = (dispatch) => ({
});

const PageStateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageState);

export default PageStateContainer;
