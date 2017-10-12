import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'
import { List } from 'immutable'

const getTeamsByPage = (state, props) => {
  return state.getIn(['page', 'modelHistory', state.getIn(['page', 'currentKey']), 'teams'])
}

const sortTeams = memoize((pageTeams) => {
  return pageTeams.sort((a, b) => {
    if (a.get('team_number') < b.get('team_number')) {
      return -1
    }
    if (a.get('team_number') > b.get('team_number')) {
      return 1
    }
    return 0
  })
})

export const getAllTeams = createSelector(
  [getTeamsByPage],
  (teamsByPage) => {
    let allTeams = List()
    if (teamsByPage) {
      for (let pageNum=0; pageNum<14; pageNum++) {
        let pageTeams = teamsByPage.get(pageNum)
        if (pageTeams) {
          allTeams = allTeams.concat(sortTeams(pageTeams, pageNum))
        }
      }
    }
    return allTeams
  }
)
