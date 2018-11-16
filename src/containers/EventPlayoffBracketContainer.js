import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSortedEventPlayoffMatches } from '../selectors/EventPageSelectors'
import EventPlayoffBracket from '../components/EventPlayoffBracket'

const mapStateToProps = (state, props) => ({
  alliances: state.getIn(['models', 'eventAlliances', 'byKey', props.eventKey, 'alliances']),
  matches: getSortedEventPlayoffMatches(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const EventPlayoffBracketContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPlayoffBracket)

EventPlayoffBracket.propTypes = {
  eventKey: PropTypes.string.isRequired,
}

export default EventPlayoffBracketContainer
