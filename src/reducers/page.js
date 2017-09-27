import * as types from '../constants/ActionTypes';
import { Map, Set } from 'immutable';

const updateFromSource = (state = Map({
  data: Map(),
}), action) => {
  return state
    .set('data', state.get('data').mergeDeep(action.data))
  return state
}

const updateSetFromSource = (state = Map({
  data: Set(),
}), action) => {
  const newSet = action.data.toSet()
  const toAdd = newSet.subtract(state.get('data'))
  return state
    .set('data', state.get('data').intersect(newSet).union(toAdd))

  return state
}

const page = (state = Map({
  currentKey: undefined,
  pageHistory: Map(),
}), action) => {
  const currentKey = state.get('currentKey')
  let currentPage = state.getIn(['pageHistory', currentKey])
  if (currentPage === undefined) {
    currentPage = Map()
  }
  switch (action.type) {
    case types.RESET_PAGE:
      return state.set('currentKey', action.key)
    case types.RECEIVE_EVENT_INFO:
      return state.setIn(['pageHistory', currentKey, 'event'],
        updateFromSource(currentPage.get('event'), action))
    case types.RECEIVE_YEAR_EVENTS:
      return state.setIn(['pageHistory', currentKey, 'events'],
        updateSetFromSource(currentPage.get('events'), action))
    case types.RECEIVE_EVENT_MATCHES:
      return state.setIn(['pageHistory', currentKey, 'matches'],
        updateSetFromSource(currentPage.get('matches'), action))
    case types.RECEIVE_EVENT_TEAMS:
      return state.setIn(['pageHistory', currentKey, 'teams'],
        updateSetFromSource(currentPage.get('teams'), action))
    case types.RECEIVE_TEAM_INFO:
      return state.setIn(['pageHistory', currentKey, 'team'],
        updateFromSource(currentPage.get('team'), action))
    case types.RECEIVE_TEAM_LIST_PAGE:
      return state.setIn(['pageHistory', currentKey, 'teams', action.pageNum],
        updateSetFromSource(currentPage.getIn(['teams', action.pageNum]), action))
    case types.RECEIVE_TEAM_YEAR_EVENTS:
      return state.setIn(['pageHistory', currentKey, 'teamYearEvents'],
        updateSetFromSource(currentPage.get('teamYearEvents'), action))
    default:
      return state
  }
}
export default page
