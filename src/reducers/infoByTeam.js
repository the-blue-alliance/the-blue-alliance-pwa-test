import {
  REQUEST_TEAM_INFO,
  RECEIVE_TEAM_INFO
} from '../constants/ActionTypes'

const defaultState = {
  isFetching: false,
  data: null,
}

const teamInfo = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_TEAM_INFO:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_TEAM_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

const infoByTeam = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEAM_INFO:
    case RECEIVE_TEAM_INFO:
      return Object.assign({}, state, {
        [action.teamNumber]: teamInfo(state[action.teamNumber], action)
      })
    default:
      return state
  }
}
export default infoByTeam
