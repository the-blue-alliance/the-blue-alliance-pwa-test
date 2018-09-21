import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTeamEventMatches } from '../selectors/TeamAtEventSelectors'
import MatchList from '../components/MatchList'

const mapStateToProps = (state, props) => ({
  matches: getTeamEventMatches(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const TeamEventMatchListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList)

TeamEventMatchListContainer.propTypes = {
  eventKey: PropTypes.string.isRequired,
  teamKey: PropTypes.string.isRequired,
}

export default TeamEventMatchListContainer
