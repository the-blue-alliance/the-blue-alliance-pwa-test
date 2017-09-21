import { createSelector } from 'reselect'
import { List, Map } from 'immutable'

const getTeams = (state, props) =>
  state.getIn(['models', 'teams', 'byKey'])

const getTeamsByPage = (state, props) => {
  return state.getIn(['models', 'teams', 'collections', 'byPage'])
}

export const getAllTeams = createSelector(
  [getTeams, getTeamsByPage],
  (teams, teamKeysByPage) => {
    let allTeams = List()
    if (teamKeysByPage) {
      for (let pageNum=0; pageNum<14; pageNum++) {
        const pageTeamKeys = teamKeysByPage.get(pageNum)
        if (pageTeamKeys) {
          let pageTeams = pageTeamKeys.map(teamKey => teams.get(teamKey)).toList()
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

export const getTeamsByTab = createSelector(
  [getTeams, getTeamsByPage],
  (teams, teamKeysByPage) => {
    console.time("getTeamsByTab")
    let teamsByTab = List()
    let teamsByPage = List()
    if (teams && teamKeysByPage) {
      teamKeysByPage.map((pageTeamKeys, pageNum) => {
        teamsByPage = teamsByPage.set(pageNum, null)
        if (pageTeamKeys !==  null) {
          let pageTeams = pageTeamKeys.map(teamKey =>
            teams.get(teamKey)).toList()
          pageTeams = pageTeams.sort((a, b) => {
            if (a.get('team_number') < b.get('team_number')) {
              return -1
            }
            if (a.get('team_number') > b.get('team_number')) {
              return 1
            }
            return 0
          })
          teamsByPage = teamsByPage.set(pageNum, pageTeams)
        }
      })

      teamsByPage.map((pageTeams, pageNum) => {
        teamsByTab = teamsByTab.push(Map({
          tabLabel: `${Math.max(pageNum * 500, 1)}-${pageNum * 500 + 499}`,
          tabTeams: pageTeams,
        }))
      })
    }
    console.timeEnd("getTeamsByTab")
    return teamsByTab
  }
)
