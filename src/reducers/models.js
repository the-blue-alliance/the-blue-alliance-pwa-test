import * as types from '../constants/ActionTypes'
import { fromJS, Map, Set } from 'immutable'

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

const updateMulti = (state, modelType, partialPath, newModels, mergeByKey=false) => {
  let newModelsByKey = Map()
  fromJS(newModels).forEach(o => newModelsByKey = newModelsByKey.set(o.get('key'), o))

  // Merge new models into current models
  const byKeyPath = [modelType].concat(['byKey'])
  const mergedModelsByKey = mergeDeep(state.getIn(byKeyPath), newModelsByKey)

  // Merge new collection into current collection
  const collectionPath = [modelType, 'collections'].concat(partialPath)
  const mergedCollection = updateCollection(
    state.getIn(collectionPath),
    mergedModelsByKey,
    newModelsByKey,
    mergeByKey
  )
  return state.setIn(
    byKeyPath,
    mergedModelsByKey
  ).setIn(
    collectionPath,
    mergedCollection
  )
}

const updateCollection = (state = Map(), allModelsByKey, newModelsByKey, mergeByKey) => {
  // Helper to merge collection into current collection using the same objects in allModelsBykey
  const oldKeys = Set(state.keys())
  const newKeys = Set(newModelsByKey.keys())
  if (!mergeByKey) { // Whether to merge or overwrite the collection
    const toRemove = oldKeys.subtract(newKeys)
    toRemove.forEach(key => state = state.remove(key))
  }
  newKeys.forEach(key => state = state.set(key, mergeDeep(state.get(key), allModelsByKey.get(key))))
  return state
}

const models = (state = Map(), action) => {
  switch (action.type) {
    case types.RECEIVE_TEAM_YEARS:
      return updateSingle(
        state,
        'teamYears',
        action.teamKey,
        action.data)
    case types.RECEIVE_TEAM_INFO:
      return updateSingle(
        state,
        'teams',
        action.teamKey,
        action.data)
    case types.RECEIVE_TEAM_YEAR_AWARDS:
      return updateMulti(
        state,
        'awards',
        ['byTeamYear', action.teamKey, action.year],
        action.data)
    case types.RECEIVE_TEAM_YEAR_EVENTS:
      return updateMulti(
        state,
        'events',
        ['byTeamYear', action.teamKey, action.year],
        action.data)
    case types.RECEIVE_TEAM_YEAR_MATCHES:
      return updateMulti(
        state,
        'matches',
        ['byTeamYear', action.teamKey, action.year],
        action.data)
    case types.RECEIVE_TEAM_YEAR_EVENT_STATUSES:
      return updateMulti(
        state,
        'teamEventStatuses',
        ['byTeamYear', action.teamKey, action.year],
        action.data)
    case types.RECEIVE_EVENT_INFO:
      return updateSingle(
        state,
        'events',
        action.eventKey,
        action.data)
    case types.RECEIVE_YEAR_EVENTS:
      return updateMulti(
        state,
        'events',
        ['byYear', action.year],
        action.data)
    case types.RECEIVE_EVENT_AWARDS:
      return updateMulti(
        state,
        'awards',
        ['byEvent', action.eventKey],
        action.data)
    case types.RECEIVE_EVENT_MATCHES:
      return updateMulti(
        state,
        'matches',
        ['byEvent', action.eventKey],
        action.data)
    case types.RECEIVE_EVENT_TEAMS:
      return updateMulti(
        state,
        'teams',
        ['byEvent', action.eventKey],
        action.data)
    case types.RECEIVE_EVENT_TEAM_STATUSES:
      return updateMulti(
        state,
        'teamEventStatuses',
        ['byEvent', action.eventKey],
        action.data)
    case types.RECEIVE_TEAM_LIST_PAGE:
      return updateMulti(
        state,
        'teams',
        ['all'],
        action.data,
        true)
    case types.RECEIVE_MATCH_INFO:
      return updateSingle(
        state,
        'matches',
        action.matchKey,
        action.data)
    default:
      return state
  }
}
export default models
