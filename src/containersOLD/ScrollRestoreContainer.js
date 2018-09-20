import { connect } from 'react-redux'
import { setScrollState } from '../actions'
import { getCurrentScrollStates } from '../selectors/CommonPageSelectors'
import ScrollRestore from '../components/ScrollRestore.js'


const mapStateToProps = (state, props) => ({
  scrollState: getCurrentScrollStates(state, props).get(props.scrollId),
})

const mapDispatchToProps = (dispatch) => ({
  setScrollState: (id, scrollTop) => dispatch(setScrollState(id, scrollTop)),
})

const ScrollRestoreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollRestore)

export default ScrollRestoreContainer
