import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSortedEventMatches, getSortedEventQualMatches, getSortedEventPlayoffMatches } from '../selectors/EventPageSelectors'
import { getFavoriteTeamKeys } from '../selectors/UserFavoriteSelectors'
import MatchTable from '../components/MatchTable'

const mapStateToProps = (state, props) => ({
  matches: props.qual ? getSortedEventQualMatches(state, props) : (props.playoff ? getSortedEventPlayoffMatches(state, props) : getSortedEventMatches(state, props)),
  favoriteTeamKeys: getFavoriteTeamKeys(state, props),
})

const mapDispatchToProps = (dispatch) => ({
})

const MatchTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchTable)

MatchTableContainer.propTypes = {
  eventKey: PropTypes.string.isRequired,
}

export default MatchTableContainer
