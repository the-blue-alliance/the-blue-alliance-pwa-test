import { connect } from 'react-redux'
import { setPageState } from '../actions'
import { getCurrentPageState } from '../selectors/CommonPageSelectors'
import { getDistricts } from '../selectors/EventListPageSelectors'
import EventFilterDialog from '../components/EventFilterDialog'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  isOpen: getCurrentPageState(state, props).get('filterDialogOpen'),
  locationFilter: getCurrentPageState(state, props).get('locationFilter'),
  districtFilters: getCurrentPageState(state, props).get('districtFilters'),
  districts: getDistricts(state, props),
  // Data
})

const mapDispatchToProps = (dispatch) => ({
  setPageState: (pageState) => dispatch(setPageState(pageState)),
})

const EventFilterDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFilterDialog)

export default EventFilterDialogContainer
