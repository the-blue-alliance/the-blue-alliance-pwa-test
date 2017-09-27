import { createSelector } from 'reselect'
import { List } from 'immutable'

const getMatches = (state, props) => {
  return state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'matches', 'data'])
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
  return state.getIn(['page', 'pageHistory', state.getIn(['page', 'currentKey']), 'teams', 'data'])
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
