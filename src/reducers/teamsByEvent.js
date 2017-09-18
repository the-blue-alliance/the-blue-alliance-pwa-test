import {
  REQUEST_EVENT_TEAMS,
  RECEIVE_EVENT_TEAMS
} from '../constants/ActionTypes'

const defaultState = {
  isFetching: false,
  data: null,
}

const teams = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_EVENT_TEAMS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_EVENT_TEAMS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

const teamsByEvent = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_EVENT_TEAMS:
    case RECEIVE_EVENT_TEAMS:
      return Object.assign({}, state, {
        [action.eventKey]: teams(state[action.eventKey], action)
      })
    default:
      return state
  }
}
export default teamsByEvent
