import { createSelector } from 'reselect'
import { List, Map } from 'immutable'

const getTeamsByPage = (state, props) => {
  return state.getIn(['page', 'teams'])
}

export const getAllTeams = createSelector(
  [getTeamsByPage],
  (teamsByPage) => {
    let allTeams = List()
    if (teamsByPage) {
      for (let pageNum=0; pageNum<14; pageNum++) {
        let pageTeams = teamsByPage.getIn([pageNum, 'data'])
        if (pageTeams) {
          pageTeams = pageTeams.sort((a, b) => {
            if (a.get('team_number') < b.get('team_number')) {
              return -1
            }
            if (a.get('team_number') > b.get('team_number')) {
              return 1
            }
            return 0
          })
          allTeams = allTeams.concat(pageTeams)
        }
      }
    }
    return allTeams
  }
)
