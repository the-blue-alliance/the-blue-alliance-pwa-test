import memoize from 'lodash.memoize'
import { List } from 'immutable'

const getTeamsByPage = (state, pageNum) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const teams = state.getIn(['page', 'modelHistory', key, 'teams', 'collections', 'byPage', pageNum])
    if (teams !== undefined) {
      return teams
    }
  }
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

export const getSortedTeams = (state, props) => { // TODO: should be memoized
  let allTeams = List()
  for (let pageNum=0; pageNum<14; pageNum++) {
    let pageTeams = getTeamsByPage(state, pageNum)
    if (pageTeams) {
      allTeams = allTeams.concat(sortTeams(pageTeams, pageNum))
    }
  }
  return allTeams
}
