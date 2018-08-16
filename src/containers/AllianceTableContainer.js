import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AllianceTable from '../components/AllianceTable'

const mapStateToProps = (state, props) => ({
  alliances: state.getIn(['models', 'eventAlliances', 'byKey', props.eventKey, 'alliances']),
})

const mapDispatchToProps = (dispatch) => ({
})

const AllianceTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllianceTable)

AllianceTable.propTypes = {
  eventKey: PropTypes.string.isRequired,
}

export default AllianceTableContainer
