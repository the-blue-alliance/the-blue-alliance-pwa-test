import { connect } from 'react-redux'
import { setPageState } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import GroupedEventTabs from '../components/GroupedEventTabs'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  activeGroup: getCurrentPageState(state, props).get('activeEventGroup'),
  // Data
})

const mapDispatchToProps = (dispatch) => ({
  setPageState: (pageState) => dispatch(setPageState(pageState)),
})

const GroupedEventTabsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupedEventTabs)

export default GroupedEventTabsContainer
