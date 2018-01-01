import { createSelector } from 'reselect'
import { List } from 'immutable'
import Team from '../database/Team'

const getAllTeams = (state) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const teams = state.getIn(['page', 'modelHistory', key, 'teams', 'collections', 'all'])
    if (teams !== undefined) {
      return teams
    }
  }
}

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
