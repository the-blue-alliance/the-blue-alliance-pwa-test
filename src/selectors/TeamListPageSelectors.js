import { createSelector } from 'reselect'
import { List, Map } from 'immutable'

const getTeams = (state, props) =>
  state.getIn(['models', 'teams', 'byKey'])

const getTeamsByPage = (state, props) => {
  return state.getIn(['models', 'teams', 'collections', 'byPage'])
}

export const getTeamsByTab = createSelector(
  [getTeams, getTeamsByPage],
  (teams, teamKeysByPage) => {
    let teamsByTab = List()
    let teamsByPage = teamKeysByPage
    if (teams && teamKeysByPage) {
      teamKeysByPage.map((pageTeamKeys, pageNum) => {
        teamsByPage = teamsByPage.setIn([pageNum, 'record'], null)
        if (pageTeamKeys.get('record') !==  null) {
          teamsByPage = teamsByPage.setIn(
            [pageNum, 'record'],
            pageTeamKeys.get('record').map(teamKey =>
              teams.getIn([teamKey, 'record']))
          )
        }
      })

      teamsByPage.map((pageTeams, pageNum) => {
        teamsByTab = teamsByTab.push(Map({
          tabLabel: `${Math.max(pageNum * 500, 1)}-${pageNum * 500 + 499}`,
          tabTeams: pageTeams,
        }))
      })
    }
    return teamsByTab
  }
)
