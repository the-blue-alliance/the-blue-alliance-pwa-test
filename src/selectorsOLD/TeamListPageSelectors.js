import { createSelector } from 'reselect'
import Team from '../database/Team'

const getTeamsByKey = (state, props) => {
  return state.getIn(['models', 'teams', 'byKey'])
}
const getAllTeamKeys = (state, props) => {
  return state.getIn(['models', 'teams', 'collections', 'all'])
}

const getAllTeams = createSelector(
  getTeamsByKey,
  getAllTeamKeys,
  (teamsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => teamsByKey.get(key))
    }
  }
)

export const getSortedTeams = createSelector(
  [getAllTeams],
  (teams) => {
    if (teams) {
      teams = teams.map(m => new Team(m))
      return teams.toList().sort((a, b) => {
        const orderA = a.get('team_number')
        const orderB = b.get('team_number')
        if (orderA < orderB) {
          return -1
        }
        if (orderA > orderB) {
          return 1
        }
        return 0
      }).toList()
    }
    return undefined
  }
)
