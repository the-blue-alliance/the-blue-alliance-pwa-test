import {
  REQUEST_TEAM_YEAR_EVENTS,
  RECEIVE_TEAM_YEAR_EVENTS
} from '../constants/ActionTypes'

const defaultState = {
  isFetching: false,
  data: null,
}

const teamYearEvents = (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_TEAM_YEAR_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_TEAM_YEAR_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}

const teamEvents = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEAM_YEAR_EVENTS:
    case RECEIVE_TEAM_YEAR_EVENTS:
      return Object.assign({}, state, {
        [action.year]: teamYearEvents(state[action.year], action)
      })
    default:
      return state
  }
}

const eventsByTeamByYear = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEAM_YEAR_EVENTS:
    case RECEIVE_TEAM_YEAR_EVENTS:
      return Object.assign({}, state, {
        [action.teamNumber]: teamEvents(state[action.teamNumber], action)
      })
    default:
      return state
  }
}
export default eventsByTeamByYear
