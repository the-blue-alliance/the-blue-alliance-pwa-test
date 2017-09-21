import * as types from '../constants/ActionTypes';
import { Map, Set } from 'immutable';

const updateByKey = (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_EVENT_INFO:
    case types.RECEIVE_TEAM_INFO:
      return state.mergeDeep(action.data)
    default:
      return state
  }
}

const updateCollection = (state = Set(), action) => {
  switch (action.type) {
    case types.RECEIVE_EVENT_TEAMS:
    case types.RECEIVE_TEAM_YEAR_EVENTS:
    case types.RECEIVE_TEAM_LIST_PAGE:
    case types.RECEIVE_YEAR_EVENTS:
      const newKeys = Set(action.data.map(o => o.key))
      const toAdd = newKeys.subtract(state)
      return state.intersect(newKeys).union(toAdd)
    default:
      return state
  }
}

const updateByKeyFromCollection = (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_EVENT_TEAMS:
    case types.RECEIVE_TEAM_YEAR_EVENTS:
    case types.RECEIVE_TEAM_LIST_PAGE:
    case types.RECEIVE_YEAR_EVENTS:
      action.data.forEach(o => state = state.mergeDeep({
        [o.key]: o,
      }))
      return state
    default:
      return state
  }
}

const tbk = ['teams', 'byKey']
const ebk = ['events', 'byKey']
const models = (state = Map({
  events: Map({
    byKey: Map(),
    collections: Map(),
  }),
  teams: Map({
    byKey: Map(),
    collections: Map(),
  }),
}), action) => {
  switch (action.type) {
    case types.RECEIVE_EVENT_INFO:
      const ebkKey = ['events', 'byKey', action.eventKey]
      return state
        .setIn(ebkKey, updateByKey(state.getIn(ebkKey), action))
    case types.RECEIVE_EVENT_TEAMS:
      const tcbeKey = ['teams', 'collections', 'byEvent', action.eventKey]
      return state
        .setIn(tcbeKey, updateCollection(state.getIn(tcbeKey), action))
        .setIn(tbk, updateByKeyFromCollection(state.getIn(tbk), action))
    case types.RECEIVE_TEAM_INFO:
      const tbkKey = ['teams', 'byKey', action.teamKey]
      return state
        .setIn(tbkKey, updateByKey(state.getIn(tbkKey), action))
    case types.RECEIVE_TEAM_YEAR_EVENTS:
      const ecbtyKeyYear = ['events', 'collections', 'byTeamYear', action.teamKey, action.year]
      return state
        .setIn(ecbtyKeyYear, updateCollection(state.getIn(ecbtyKeyYear), action))
        .setIn(ebk, updateByKeyFromCollection(state.getIn(ebk), action))
    case types.RECEIVE_TEAM_LIST_PAGE:
      const tcbpNum = ['teams', 'collections', 'byPage', action.pageNum]
      return state
        .setIn(tcbpNum, updateCollection(state.getIn(tcbpNum), action))
        .setIn(tbk, updateByKeyFromCollection(state.getIn(tbk), action))
    case types.RECEIVE_YEAR_EVENTS:
      const ecbyYear = ['events', 'collections', 'byYear', action.year]
      return state
        .setIn(ecbyYear, updateCollection(state.getIn(ecbyYear), action))
        .setIn(ebk, updateByKeyFromCollection(state.getIn(ebk), action))
    default:
      return state
  }
}
export default models
