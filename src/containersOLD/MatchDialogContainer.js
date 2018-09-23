import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import { resetModal, setModalState } from '../actions'
import { getCurrentModalState } from '../selectors/CommonPageSelectors'
import { getEvent, getMatch } from '../selectors/MatchPageSelectors'
import MatchDialog from '../components/MatchDialog'


const mapStateToProps = (state, props) => ({
  // Params
  // States
  tabIdx: getCurrentModalState(state, props).get('tabIdx'),
  // Data
  event: getEvent(state, props),
  matchObj: getMatch(state, props),
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
  resetModal: (defaultState) => dispatch(resetModal(defaultState)),
  setModalState: (pageState) => dispatch(setModalState(pageState)),
})

const MatchDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchDialog)

export default MatchDialogContainer
