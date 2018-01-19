import { connect } from 'react-redux'
import TeamAtEventDialog from '../components/TeamAtEventDialog'
import { getTeam, getSortedMatches } from '../selectors/TeamAtEventDialogSelectors'


const mapStateToProps = (state, props) => ({
  // States
  // Params
  // Data
  team: getTeam(state, props),
  matches: getSortedMatches(state, props),
});

const mapDispatchToProps = (dispatch) => ({
});

const TeamAtEventDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAtEventDialog)

export default TeamAtEventDialogContainer;
