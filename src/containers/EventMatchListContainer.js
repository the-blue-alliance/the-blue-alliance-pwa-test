import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMatches } from '../selectors/EventPageSelectors'
import MatchList from '../components/MatchList'

const mapStateToProps = (state, props) => ({
  matches: getMatches(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const EventMatchListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList)

EventMatchListContainer.propTypes = {
  eventKey: PropTypes.string.isRequired,
}

export default EventMatchListContainer
