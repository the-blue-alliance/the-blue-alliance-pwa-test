import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import { resetModal, setModalState, fetchEventAwards, fetchEventMatches, fetchEventTeams, fetchEventTeamStatuses } from '../actions'
import { getCurrentModalState } from '../selectors/CommonPageSelectors'
import TeamAtEventDialog from '../components/TeamAtEventDialog'
import { getTeamNumber, getEventKey, getTeamModel, getEventModel, getSortedAwards, getTeamEventStatus } from '../selectors/TeamAtEventDialogSelectors'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  isLoading: state.getIn(['appState', 'loadingCount']) > 0,
  tabIdx: getCurrentModalState(state, props).get('tabIdx'),
  // Data
  teamNumber: getTeamNumber(state, props),
  eventKey: getEventKey(state, props),
  team: getTeamModel(state, props),
  event: getEventModel(state, props),
  awards: getSortedAwards(state, props),
  status: getTeamEventStatus(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
  resetModal: (defaultState) => dispatch(resetModal(defaultState)),
  setModalState: (pageState) => dispatch(setModalState(pageState)),
  fetchEventAwards: (eventKey) => dispatch(fetchEventAwards(eventKey)),
  fetchEventMatches: (eventKey) => dispatch(fetchEventMatches(eventKey)),
  fetchEventTeams: (eventKey) => dispatch(fetchEventTeams(eventKey)),
  fetchEventTeamStatuses: (eventKey) => dispatch(fetchEventTeamStatuses(eventKey)),
})

const TeamAtEventDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAtEventDialog)

export default TeamAtEventDialogContainer
