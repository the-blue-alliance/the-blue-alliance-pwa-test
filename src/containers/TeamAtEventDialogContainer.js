import { connect } from 'react-redux'
import { fetchEventMatches, fetchEventTeams } from '../actions'
import TeamAtEventDialog from '../components/TeamAtEventDialog'
import { getTeamNumber, getEventKey, getTeam, getEvent, getSortedMatches } from '../selectors/TeamAtEventDialogSelectors'


const mapStateToProps = (state, props) => ({
  // States
  // Params
  // Data
  teamNumber: getTeamNumber(state, props),
  eventKey: getEventKey(state, props),
  team: getTeam(state, props),
  event: getEvent(state, props),
  matches: getSortedMatches(state, props),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
});

const TeamAtEventDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAtEventDialog)

export default TeamAtEventDialogContainer;
