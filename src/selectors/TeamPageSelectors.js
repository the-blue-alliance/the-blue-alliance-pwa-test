import { createSelector } from 'reselect'

export const getTeam = (state, props) =>
  state.getIn(['models', 'teams', 'byKey', `frc${props.match.params.teamNumber}`])

const getEvents = (state, props) =>
  state.getIn(['models', 'events', 'byKey'])

const getTeamYearEventKeys = (state, props) => {
  let year = props.match.params.year === undefined ? 2017 : props.match.params.year
  return state.getIn(['models', 'events', 'collections', 'byTeamYear', `frc${props.match.params.teamNumber}`, year])
}

export const getTeamYearEvents = createSelector(
  [getEvents, getTeamYearEventKeys],
  (events, teamYearEventKeys) => {
    let teamYearEvents = teamYearEventKeys
    if (events && teamYearEventKeys && teamYearEventKeys.get('record')) {
      const fullEvents = teamYearEventKeys.get('record').map(eventKey => events.getIn([eventKey, 'record']))
      teamYearEvents = teamYearEventKeys.set('record', fullEvents)
    }
    return teamYearEvents
  }
)
