import { createSelector } from 'reselect'

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
      return teams.toList().sort((a, b) => {
        const orderA = a.team_number
        const orderB = b.team_number
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
