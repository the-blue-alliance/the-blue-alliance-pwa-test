import { createSelector } from 'reselect'

export const getEvent = (state, props) =>
  state.getIn(['models', 'events', 'byKey', props.match.params.eventKey])

const getTeams = (state, props) =>
  state.getIn(['models', 'teams', 'byKey'])

const getEventTeamKeys = (state, props) => {
  return state.getIn(['models', 'teams', 'collections', 'byEvent', props.match.params.eventKey])
}

export const getEventTeams = createSelector(
  [getTeams, getEventTeamKeys],
  (teams, eventTeamKeys) => {
    let eventTeams = eventTeamKeys
    if (teams && eventTeamKeys && eventTeamKeys.get('record')) {
      const fullTeams = eventTeamKeys.get('record').map(teamKey => teams.getIn([teamKey, 'record']))
      eventTeams = eventTeamKeys.set('record', fullTeams)
    }
    return eventTeams
  }
)
