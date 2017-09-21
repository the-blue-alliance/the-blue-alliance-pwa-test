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
    let eventTeams = null
    if (teams && eventTeamKeys) {
      eventTeams = eventTeamKeys.map(teamKey => teams.get(teamKey))
    }
    return eventTeams
  }
)
