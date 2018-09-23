import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EventRankingsTable from '../components/EventRankingsTable'

const mapStateToProps = (state, props) => ({
  rankings: state.getIn(['models', 'eventRankings', 'byKey', props.eventKey, 'rankings']),
})

const mapDispatchToProps = (dispatch) => ({
})

const EventRankingsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRankingsTable)

EventRankingsTable.propTypes = {
  eventKey: PropTypes.string.isRequired,
}

export default EventRankingsTableContainer
