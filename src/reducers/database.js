import {
  SET_TEAM_LIST,
} from '../constants/ActionTypes'

const defaultState = {
  teams: {},
  teamList: [],
  events: {},
}

const database = (state = defaultState, action) => {
  switch (action.type) {
    case SET_TEAM_LIST:
      const newState = Object.assign({}, state)
      action.teams.forEach((team) => {
        newState.teams[team.key] = team
        newState.teamList.push(team)
      })
      return newState
    default:
      return state
  }
}

export default database
