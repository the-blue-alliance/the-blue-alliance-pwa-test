import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { toJS } from './to-js'
import { fetchEventInfo, fetchEventTeams } from '../actions'
import { getEvent, getEventTeams } from '../selectors/EventPageSelectors'
import EventPage from '../components/EventPage.js'


const mapStateToProps = (state, props) => ({
  event: getEvent(state, props),
  eventTeams: getEventTeams(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
});

const EventPageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(EventPage)));

export default EventPageContainer;
