import {
  REQUEST_EVENT_INFO,
  RECEIVE_EVENT_INFO
} from '../constants/ActionTypes'

const defaultState = {
  isFetching: false,
  data: null,
}

const eventInfo = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_EVENT_INFO:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_EVENT_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

const infoByEvent = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_EVENT_INFO:
    case RECEIVE_EVENT_INFO:
      return Object.assign({}, state, {
        [action.eventKey]: eventInfo(state[action.eventKey], action)
      })
    default:
      return state
  }
}
export default infoByEvent
