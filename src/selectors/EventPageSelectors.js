import { createSelector } from 'reselect'
import { List } from 'immutable'

export const getEventKey = (state, props) => {
  return props.match.params.eventKey
}

const getMatches = (state, props) => {
  return state.getIn(['page', 'modelHistory', state.getIn(['page', 'currentKey']), 'matches'])
}

export const getEventMatches = createSelector(
  [getMatches],
  (matches) => {
    if (matches) {
      return matches.sort((a, b) => {
        const orderA = a.getPlayOrder()
        const orderB = b.getPlayOrder()
        if (orderA < orderB) {
          return -1
        }
        if (orderA > orderB) {
          return 1
        }
        return 0
      }).toList()
    }
    return List()
  }
)

const getTeams = (state, props) => {
  return state.getIn(['page', 'modelHistory', state.getIn(['page', 'currentKey']), 'teams'])
}

export const getEventTeams = createSelector(
  [getTeams],
  (teams) => {
    if (teams) {
      return teams.sort((a, b) => {
        if (a.get('team_number') < b.get('team_number')) {
          return -1
        }
        if (a.get('team_number') > b.get('team_number')) {
          return 1
        }
        return 0
      }).toList()
    }
    return List()
  }
)
