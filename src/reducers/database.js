import {
  REQUEST_YEAR_EVENTS,
  RECEIVE_YEAR_EVENTS,
  REQUEST_TEAM_LIST_PAGE,
  RECEIVE_TEAM_LIST_PAGE,
} from '../constants/ActionTypes'


const modelsByKey = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_YEAR_EVENTS:
    case RECEIVE_TEAM_LIST_PAGE:
      var newModels = {}
      action.data.forEach(o => newModels[o.key] = o)
      return Object.assign({}, state, newModels)
    default:
      return state
  }
}

const fetchKeysStatus = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_YEAR_EVENTS:
    case REQUEST_TEAM_LIST_PAGE:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_YEAR_EVENTS:
    case RECEIVE_TEAM_LIST_PAGE:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data.map(o => o.key),
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
        [action.year]: fetchKeysStatus(state[action.year], action)
      })
    default:
      return state
  }
}

const paginatedTeamsWrapper = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_TEAM_LIST_PAGE:
    case RECEIVE_TEAM_LIST_PAGE:
      return Object.assign({}, state, {
        [action.pageNum]: fetchKeysStatus(state[action.pageNum], action)
      })
    default:
      return state
  }
}

const database = (state = {
  events: {},
  teams: {},
  yearEvents: {},
  paginatedTeams: {},
}, action) => {
  switch (action.type) {
    case REQUEST_YEAR_EVENTS:
    case RECEIVE_YEAR_EVENTS:
      return Object.assign({}, state, {
        events: modelsByKey(state.events, action)
      }, {
        yearEvents: teamEventsWrapper(state.yearEvents, action)
      })
    case REQUEST_TEAM_LIST_PAGE:
    case RECEIVE_TEAM_LIST_PAGE:
      return Object.assign({}, state, {
        teams: modelsByKey(state.teams, action)
      }, {
        paginatedTeams: paginatedTeamsWrapper(state.paginatedTeams, action)
      })
    default:
      return state
  }
}
export default database
