import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTeamEventStatus, getTeamEventAwards } from '../selectors/TeamAtEventSelectors'
import TeamAtEventResults from '../components/TeamAtEventResults'

const mapStateToProps = (state, props) => ({
  status: getTeamEventStatus(state, props),
  awards: getTeamEventAwards(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const TeamAtEventResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAtEventResults)

TeamAtEventResultsContainer.propTypes = {
  teamKey: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
}

export default TeamAtEventResultsContainer
