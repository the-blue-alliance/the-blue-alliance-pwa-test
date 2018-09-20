import { connect } from 'react-redux'
import { setPageState } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import GroupedEventTabContents from '../components/GroupedEventTabContents'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  activeEventGroup: getCurrentPageState(state, props).get('activeEventGroup'),
  // Data
})

const mapDispatchToProps = (dispatch) => ({
  setPageState: (pageState) => dispatch(setPageState(pageState)),
})

const GroupedEventTabContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupedEventTabContents)

export default GroupedEventTabContentsContainer
