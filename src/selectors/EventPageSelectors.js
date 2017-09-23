import { createSelector } from 'reselect'
import { List } from 'immutable'

const PLAY_ORDER = {
  qm: 1,
  ef: 2,
  qf: 3,
  sf: 4,
  f: 5,
}

const getMatches = (state, props) => {
  return state.getIn(['page', 'matches', 'data'])
}

export const getEventMatches = createSelector(
  [getMatches],
  (matches) => {
    if (matches) {
      return matches.sort((a, b) => {
        const orderA = PLAY_ORDER[a.get('comp_level')]*100000 + a.get('match_number')*100 + a.get('set_number')
        const orderB = PLAY_ORDER[b.get('comp_level')]*100000 + b.get('match_number')*100 + b.get('set_number')
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
  return state.getIn(['page', 'teams', 'data'])
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
