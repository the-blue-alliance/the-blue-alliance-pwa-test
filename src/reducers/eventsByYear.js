import {
  REQUEST_YEAR_EVENTS,
  RECEIVE_YEAR_EVENTS
} from '../constants/ActionTypes'

const defaultState = {
  isFetching: false,
  data: null,
}

const yearEvents = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_YEAR_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_YEAR_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

const eventsByYear = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_YEAR_EVENTS:
    case RECEIVE_YEAR_EVENTS:
      return Object.assign({}, state, {
        [action.year]: yearEvents(state[action.year], action)
      })
    default:
      return state
  }
}
export default eventsByYear
