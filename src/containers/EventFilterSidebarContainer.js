import { connect } from 'react-redux'
import { setPageState } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getDistricts } from '../selectors/EventListPageSelectors'
import EventFilterSidebar from '../components/EventFilterSidebar'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  locationFilter: getCurrentPageState(state, props).get('locationFilter'),
  districtFilters: getCurrentPageState(state, props).get('districtFilters'),
  districts: getDistricts(state, props),
  // Data
})

const mapDispatchToProps = (dispatch) => ({
  setPageState: (pageState) => dispatch(setPageState(pageState)),
})

const EventFilterSidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFilterSidebar)

export default EventFilterSidebarContainer
