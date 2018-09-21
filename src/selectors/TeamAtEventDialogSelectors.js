import { createSelector } from 'reselect'
import Event from '../database/Event'
import Team from '../database/Team'

const getYear = (state, props) => {
  return parseInt(getEventKey(state, props).substring(0, 4), 10)
}

export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber, 10)
}

export const getTeam = (state, props) => {
  return state.getIn(['models', 'teams', 'byKey', `frc${getTeamNumber(state, props)}`])
}

export const getTeamModel = createSelector(
  [getTeam],
  (team) => {
    if (team) {
      return new Team(team)
    }
    return undefined
  }
)

export const getEventKey = (state, props) => {
  return props.location.hash.substring(1)
}

const getEvent = (state, props) => {
  return state.getIn(['models', 'events', 'byKey', getEventKey(state, props)])
}

export const getEventModel = createSelector(
  [getEvent],
  (event) => {
    if (event) {
      return new Event(event)
    }
    return undefined
  }
)
