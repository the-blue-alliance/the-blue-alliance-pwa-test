import * as types from '../constants/ActionTypes'
import { fromJS, List, Map, Set } from 'immutable'

import Award from '../database/Award'
import Event from '../database/Event'
import Match from '../database/Match'
import Media from '../database/Media'
import Team from '../database/Team'

const mergeDeep = (state = Map(), data) => {
  // Wrapper for Map.mergeDeep that handles undefined state
  return state.mergeDeep(data)
}

const updateSingle = (state, modelType, modelKey, newModel) => {
  // Merge newModel into current model
  // TODO: Delete model is null
  const modelPath = [modelType, 'byKey', modelKey]
  const currentModel = state.getIn(modelPath)
  return state.setIn(modelPath, mergeDeep(currentModel, newModel))
}

const updateMulti = (state, modelType, partialPath, newModels, merge=false) => {
  let newModelsByKey = Map()
  newModels.forEach(o => newModelsByKey = newModelsByKey.set(o.get('key'), o))

  // Merge new models into current models
  const byKeyPath = [modelType].concat(['byKey'])
  const mergedModelsByKey = mergeDeep(state.getIn(byKeyPath), newModelsByKey)

  // Merge new collection into current collection
  const collectionPath = [modelType, 'collections'].concat(partialPath)
  const mergedCollection = updateCollection(
    state.getIn(collectionPath),
    newModelsByKey,
    merge
  )
  return state.setIn(
    byKeyPath,
    mergedModelsByKey
  ).setIn(
    collectionPath,
    mergedCollection
  )
}

const updateCollection = (state = Set(), newModelsByKey, merge) => {
  // Helper to merge collection into current collection
  if (state instanceof List) {  // Might get a list due to SSR
    state = Set(state)
  }
  const newKeys = Set(newModelsByKey.keys())
  if (!merge) { // Whether to merge or overwrite the collection
    const toRemove = state.subtract(newKeys)
    toRemove.forEach(key => state = state.remove(key))
  }
  state = state.union(newKeys)
  return state
}

const models = (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_TEAM_YEARS:
      return updateSingle(
        state,
        'teamYears',
        action.teamKey,
        fromJS(action.data))
    case types.RECEIVE_TEAM_INFO:
      return updateSingle(
        state,
        'teams',
        action.teamKey,
        new Team(fromJS(action.data)))
    case types.RECEIVE_TEAM_YEAR_AWARDS:
      return updateMulti(
        state,
        'awards',
        ['byTeamYear', action.teamKey, action.year],
        fromJS(action.data).map(o => new Award(o)))
    case types.RECEIVE_TEAM_YEAR_EVENTS:
      return updateMulti(
        state,
        'events',
        ['byTeamYear', action.teamKey, action.year],
        fromJS(action.data).map(o => new Event(o)))
    case types.RECEIVE_TEAM_YEAR_MATCHES:
      return updateMulti(
        state,
        'matches',
        ['byTeamYear', action.teamKey, action.year],
        fromJS(action.data).map(o => new Match(o)))
    case types.RECEIVE_TEAM_YEAR_EVENT_STATUSES:
      return updateMulti(
        state,
        'teamEventStatuses',
        ['byTeamYear', action.teamKey, action.year],
        fromJS(action.data))
    case types.RECEIVE_TEAM_YEAR_MEDIA:
      return updateMulti(
        state,
        'media',
        ['byTeamYear', action.teamKey, action.year],
        fromJS(action.data).map(o => new Media(o)))
    case types.RECEIVE_EVENT_INFO:
      return updateSingle(
        state,
        'events',
        action.eventKey,
        new Event(fromJS(action.data)))
    case types.RECEIVE_YEAR_EVENTS:
      return updateMulti(
        state,
        'events',
        ['byYear', action.year],
        fromJS(action.data).map(o => new Event(o)))
    case types.RECEIVE_EVENT_AWARDS:
      return updateMulti(
        state,
        'awards',
        ['byEvent', action.eventKey],
        fromJS(action.data).map(o => new Award(o)))
    case types.RECEIVE_EVENT_MATCHES:
      return updateMulti(
        state,
        'matches',
        ['byEvent', action.eventKey],
        fromJS(action.data).map(o => new Match(o)))
    case types.RECEIVE_EVENT_TEAMS:
      return updateMulti(
        state,
        'teams',
        ['byEvent', action.eventKey],
        fromJS(action.data).map(o => new Team(o)))
    case types.RECEIVE_EVENT_TEAM_STATUSES:
      return updateMulti(
        state,
        'teamEventStatuses',
        ['byEvent', action.eventKey],
        fromJS(action.data))
    case types.RECEIVE_EVENT_RANKINGS:
      return updateSingle(
        state,
        'eventRankings',
        action.eventKey,
        fromJS(action.data))
    case types.RECEIVE_EVENT_ALLIANCES:
      return updateSingle(
        state,
        'eventAlliances',
        action.eventKey,
        fromJS(action.data))
    case types.RECEIVE_TEAM_LIST_PAGE:
      return updateMulti(
        state,
        'teams',
        ['all'],
        fromJS(action.data).map(o => new Team(o)),
        true)
    case types.RECEIVE_MATCH_INFO:
      return updateSingle(
        state,
        'matches',
        action.matchKey,
        new Match(fromJS(action.data)))
    default:
      return state
  }
}
export default models
