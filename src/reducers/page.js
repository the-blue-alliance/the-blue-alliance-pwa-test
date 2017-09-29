import * as types from '../constants/ActionTypes';
import { fromJS, OrderedMap, Map, Set } from 'immutable';

const updateFromSource = (state = Map({
  data: Map(),
}), action) => {
  return state
    .set('data', state.get('data').mergeDeep(action.data))
}

const updateSetFromSource = (state = Map({
  data: Set(),
}), action) => {
  const newSet = action.data.toSet()
  const toAdd = newSet.subtract(state.get('data'))
  return state
    .set('data', state.get('data').intersect(newSet).union(toAdd))
}

const page = (state = Map({
  currentKey: undefined,
  pageHistory: Map(),
  historyOrder: OrderedMap(),  // Reverse ordered LRU keys
}), action) => {
  const currentKey = state.get('currentKey')
  let currentPageData = state.getIn(['pageHistory', currentKey])
  if (currentPageData === undefined) {
    currentPageData = Map()
  }
  let currentPageState = state.getIn(['pageHistory', currentKey, 'state'])
  if (currentPageState === undefined) {
    currentPageState = Map()
  }

  switch (action.type) {
    case types.RESET_PAGE:
      state = state.set('currentKey', action.pageKey)
      if (action.defaultState && state.getIn(['pageHistory', action.pageKey, 'state']) === undefined) {
        state = state.setIn(['pageHistory', action.pageKey, 'state'], fromJS(action.defaultState))
      }
      state = state.set('historyOrder', state.get('historyOrder').delete(action.pageKey)).setIn(['historyOrder', action.pageKey], action.pageKey)
      return state
    case types.SET_PAGE_STATE:
      return state.setIn(['pageHistory', currentKey, 'state'],
        currentPageState.mergeDeep(action.pageState))
    case types.RECEIVE_EVENT_INFO:
      return state.setIn(['pageHistory', currentKey, 'event'],
        updateFromSource(currentPageData.get('event'), action))
    case types.RECEIVE_YEAR_EVENTS:
      return state.setIn(['pageHistory', currentKey, 'events'],
        updateSetFromSource(currentPageData.get('events'), action))
    case types.RECEIVE_EVENT_MATCHES:
      return state.setIn(['pageHistory', currentKey, 'matches'],
        updateSetFromSource(currentPageData.get('matches'), action))
    case types.RECEIVE_EVENT_TEAMS:
      return state.setIn(['pageHistory', currentKey, 'teams'],
        updateSetFromSource(currentPageData.get('teams'), action))
    case types.RECEIVE_TEAM_INFO:
      return state.setIn(['pageHistory', currentKey, 'team'],
        updateFromSource(currentPageData.get('team'), action))
    case types.RECEIVE_TEAM_LIST_PAGE:
      return state.setIn(['pageHistory', currentKey, 'teams', action.pageNum],
        updateSetFromSource(currentPageData.getIn(['teams', action.pageNum]), action))
    case types.RECEIVE_TEAM_YEAR_EVENTS:
      return state.setIn(['pageHistory', currentKey, 'teamYearEvents'],
        updateSetFromSource(currentPageData.get('teamYearEvents'), action))
    default:
      return state
  }
}
export default page
