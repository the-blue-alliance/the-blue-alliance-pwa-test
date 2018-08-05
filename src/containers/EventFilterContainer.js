import { connect } from 'react-redux'
import { setPageState } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getDistricts } from '../selectors/EventListPageSelectors'
import EventFilter from '../components/EventFilter'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  districtFilters: getCurrentPageState(state, props).get('districtFilters'),
  districts: getDistricts(state, props),
  // Data
})

const mapDispatchToProps = (dispatch) => ({
  setPageState: (pageState) => dispatch(setPageState(pageState)),
})

const EventFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFilter)

export default EventFilterContainer
