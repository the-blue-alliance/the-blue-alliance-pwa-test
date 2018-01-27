import { connect } from 'react-redux'
import { fetchEventAwards, fetchEventMatches, fetchEventTeams, fetchTeamEventStatus } from '../actions'
import TeamAtEventDialog from '../components/TeamAtEventDialog'
import { getTeamNumber, getEventKey, getTeam, getEvent, getSortedMatches, getSortedAwards, getTeamEventStatus } from '../selectors/TeamAtEventDialogSelectors'


const mapStateToProps = (state, props) => ({
  // States
  // Params
  // Data
  teamNumber: getTeamNumber(state, props),
  eventKey: getEventKey(state, props),
  team: getTeam(state, props),
  event: getEvent(state, props),
  matches: getSortedMatches(state, props),
  awards: getSortedAwards(state, props),
  status: getTeamEventStatus(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  fetchEventAwards: (eventKey) => dispatch(fetchEventAwards(eventKey)),
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
  fetchTeamEventStatus: (teamNumber, eventKey) => dispatch(fetchTeamEventStatus(teamNumber, eventKey)),
})

const TeamAtEventDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAtEventDialog)

export default TeamAtEventDialogContainer
