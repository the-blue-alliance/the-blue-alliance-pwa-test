import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EventAllianceTable from '../components/EventAllianceTable'

const mapStateToProps = (state, props) => ({
  alliances: state.getIn(['models', 'eventAlliances', 'byKey', props.eventKey, 'alliances']),
})

const mapDispatchToProps = (dispatch) => ({
})

const EventAllianceTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventAllianceTable)

EventAllianceTable.propTypes = {
  eventKey: PropTypes.string.isRequired,
}

export default EventAllianceTableContainer
