import { connect } from 'react-redux'
import { getWebcastStatus } from '../selectors/EventListItemSelectors'
import EventListItem from '../components/EventListItem'


const mapStateToProps = (state, props) => ({
  webcastStatus: getWebcastStatus(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const EventListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListItem)

export default EventListItemContainer
