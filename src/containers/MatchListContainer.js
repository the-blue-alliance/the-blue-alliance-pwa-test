import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSortedEventMatches, getSortedEventQualMatches, getSortedEventPlayoffMatches } from '../selectors/EventPageSelectors'
import MatchList from '../components/MatchList'

const mapStateToProps = (state, props) => ({
  matches: props.qual ? getSortedEventQualMatches(state, props) : (props.playoff ? getSortedEventPlayoffMatches(state, props) : getSortedEventMatches(state, props)),
})

const mapDispatchToProps = (dispatch) => ({
})

const MatchListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList)

MatchListContainer.propTypes = {
  eventKey: PropTypes.string.isRequired,
}

export default MatchListContainer
