import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMatches } from '../selectors/EventPageSelectors'
import MatchList from '../components/MatchList'

const mapStateToProps = (state, props) => ({
  matches: getMatches(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const MatchListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList)

MatchListContainer.propTypes = {
  eventKey: PropTypes.string.isRequired,
  selectedTeamKey: PropTypes.string,
}

export default MatchListContainer
