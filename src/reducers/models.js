import * as types from '../constants/ActionTypes';
import { Map, fromJS } from 'immutable';

const defaultFetchState = Map({
  isFetching: null,
  lastUpdated: null,
  record: null,
})

const updateByKeyFetchStatus = (state = defaultFetchState, action) => {
  switch (action.type) {
    case types.REQUEST_EVENT_INFO:
    case types.REQUEST_TEAM_INFO:
      return state
        .set('isFetching', true)
    case types.RECEIVE_EVENT_INFO:
    case types.RECEIVE_TEAM_INFO:
      return state
        .set('isFetching', false)
        .set('lastUpdated', action.receivedAt)
        .set('record', fromJS(action.data))
    default:
      return state
  }
}

const updateCollectionFetchStatus = (state = defaultFetchState, action) => {
  switch (action.type) {
    case types.REQUEST_EVENT_TEAMS:
    case types.REQUEST_TEAM_YEAR_EVENTS:
    case types.REQUEST_TEAM_LIST_PAGE:
      return state
        .set('isFetching', true)
    case types.RECEIVE_EVENT_TEAMS:
    case types.RECEIVE_TEAM_YEAR_EVENTS:
    case types.RECEIVE_TEAM_LIST_PAGE:
      return state
        .set('isFetching', false)
        .set('lastUpdated', action.receivedAt)
        .set('record', fromJS(action.data.map(o => o.key)))
    default:
      return state
  }
}

const updateByKeyFetchStatusFromCollection = (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_EVENT_TEAMS:
    case types.RECEIVE_TEAM_YEAR_EVENTS:
    case types.RECEIVE_TEAM_LIST_PAGE:
      let mutableState = state.asMutable()
      action.data.forEach(o => mutableState.set(o.key, Map({
        isFetching: false,
        lastUpdated: action.receivedAt,
        record: fromJS(o),
      })))
      return mutableState.asImmutable()
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
    case types.REQUEST_EVENT_INFO:
    case types.RECEIVE_EVENT_INFO:
      const ebkKey = ['events', 'byKey', action.eventKey]
      return state
        .setIn(ebkKey, updateByKeyFetchStatus(state.getIn(ebkKey), action))
    case types.REQUEST_EVENT_TEAMS:
    case types.RECEIVE_EVENT_TEAMS:
      const tcbeKey = ['teams', 'collections', 'byEvent', action.eventKey]
      return state
        .setIn(tcbeKey, updateCollectionFetchStatus(state.getIn(tcbeKey), action))
        .setIn(tbk, updateByKeyFetchStatusFromCollection(state.getIn(tbk), action))
    case types.REQUEST_TEAM_INFO:
    case types.RECEIVE_TEAM_INFO:
      const tbkKey = ['teams', 'byKey', action.teamKey]
      return state
        .setIn(tbkKey, updateByKeyFetchStatus(state.getIn(tbkKey), action))
    case types.REQUEST_TEAM_YEAR_EVENTS:
    case types.RECEIVE_TEAM_YEAR_EVENTS:
      const ecbtyKeyYear = ['events', 'collections', 'byTeamYear', action.teamKey, action.year]
      return state
        .setIn(ecbtyKeyYear, updateCollectionFetchStatus(state.getIn(ecbtyKeyYear), action))
        .setIn(ebk, updateByKeyFetchStatusFromCollection(state.getIn(ebk), action))
    case types.REQUEST_TEAM_LIST_PAGE:
    case types.RECEIVE_TEAM_LIST_PAGE:
      const tcbpNum = ['teams', 'collections', 'byPage', action.pageNum]
      return state
        .setIn(tcbpNum, updateCollectionFetchStatus(state.getIn(tcbpNum), action))
        .setIn(tbk, updateByKeyFetchStatusFromCollection(state.getIn(tbk), action))
    default:
      return state
  }
}
export default models
