import * as types from '../constants/ActionTypes';
import { fromJS, OrderedSet, Map, Set } from 'immutable';
import models from './models'

const updateFromSource = (state = Map(), action) => {
  return state.mergeDeep(action.data)
}

const updateSetFromSource = (state = Set(), action) => {
  const newSet = action.data
  const toAdd = newSet.subtract(state.get('data'))
  return state.intersect(newSet).union(toAdd)
}

const page = (state = Map({
  currentKey: undefined,
  stateHistory: Map(),
  modelHistory: Map(),
  historyOrder: OrderedSet(),  // Reverse ordered LRU keys
}), action) => {
  let currentPageState = state.getIn(['stateHistory', action.pageKey])
  if (currentPageState === undefined) {
    currentPageState = Map()
  }
  const currentKey = state.get('currentKey')
  let currentPageModels = state.getIn(['modelHistory', currentKey])
  if (currentPageModels === undefined) {
    currentPageModels = Map()
  }

  switch (action.type) {
    case types.RESET_PAGE:
      state = state.set('currentKey', action.pageKey)
      if (action.defaultState && state.getIn(['stateHistory', action.pageKey]) === undefined) {
        state = state.setIn(['stateHistory', action.pageKey], fromJS(action.defaultState))
      }
      state = state.set('historyOrder', state.get('historyOrder').delete(action.pageKey).add(action.pageKey))
      return state
    case types.SET_PAGE_STATE:
      return state.setIn(['stateHistory', action.pageKey],
        currentPageState.merge(action.pageState))
    case types.RECEIVE_EVENT_INFO:
      return state.setIn(['modelHistory', currentKey, 'event'],
        updateFromSource(currentPageModels.get('event'), action))
    case types.RECEIVE_YEAR_EVENTS:
      return state.setIn(['modelHistory', currentKey, 'events'],
        updateSetFromSource(currentPageModels.get('events'), action))
    case types.RECEIVE_EVENT_MATCHES:
      return state.setIn(['modelHistory', currentKey, 'matches'],
        updateSetFromSource(currentPageModels.get('matches'), action))
    case types.RECEIVE_EVENT_TEAMS:
      return state.setIn(['modelHistory', currentKey, 'teams'],
        updateSetFromSource(currentPageModels.get('teams'), action))
    case types.RECEIVE_TEAM_INFO:
      return state.setIn(['modelHistory', currentKey, 'team'],
        updateFromSource(currentPageModels.get('team'), action))
    case types.RECEIVE_TEAM_LIST_PAGE:
      return state.setIn(['modelHistory', currentKey, 'teams', action.pageNum],
        updateSetFromSource(currentPageModels.getIn(['teams', action.pageNum]), action))
    case types.RECEIVE_TEAM_YEAR_EVENTS:
      return state.setIn(['modelHistory', currentKey, 'teamYearEvents'],
        updateSetFromSource(currentPageModels.get('teamYearEvents'), action))
    default:
      return state
  }
}
export default page
