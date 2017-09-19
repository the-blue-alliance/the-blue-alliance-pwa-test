import {
  REQUEST_YEAR_EVENTS,
  RECEIVE_YEAR_EVENTS
} from '../constants/ActionTypes'


const events = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_YEAR_EVENTS:
      var newEvents = {}
      action.data.forEach(e => newEvents[e.key] = e)
      return Object.assign({}, state, newEvents)
    default:
      return state
  }
}

const yearEvents = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_YEAR_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_YEAR_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data.map(e => e.key),
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

const teamEventsWrapper = (state = {}, action) => {
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

const database = (state = {
  events: {},
  teams: {},
  yearEvents: {},
}, action) => {
  switch (action.type) {
    case REQUEST_YEAR_EVENTS:
    case RECEIVE_YEAR_EVENTS:
      return Object.assign({}, state, {
        events: events(state.events, action)
      }, {
        yearEvents: teamEventsWrapper(state.yearEvents, action)
      })
    default:
      return state
  }
}
export default database
