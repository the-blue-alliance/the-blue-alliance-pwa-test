import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchEventInfo, fetchEventTeams } from '../actions'
import EventPage from '../components/EventPage.js'


const mapStateToProps = (state, ownProps) => ({
  infoByEvent: state.infoByEvent,
  teamsByEvent: state.teamsByEvent,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEventInfo: (eventKey) => dispatch(fetchEventInfo(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
});

const EventPageContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage));

export default EventPageContainer;
