import { fromJS, Map, List } from 'immutable'

import Award from './database/Award'
import Event from './database/Event'
import Match from './database/Match'
import Media from './database/Media'
import Team from './database/Team'

const MODEL_TYPES = {
  'awards': Award,
  'events': Event,
  'matches': Match,
  'media': Media,
  'teams': Team,
}

const convertCollections = (state, collectionsPath, collectionEntries, collectionKey) => {
  // Turn preloaded collections from Lists to Sets
  // Turn collection keys to integers if it is a number
  // Do recursively
  collectionEntries.forEach((collection, entryKey) => {
    if (!isNaN(entryKey)) {
      // Remove string key entry
      state = state.removeIn(collectionsPath.concat([collectionKey, entryKey]))
      entryKey = parseInt(entryKey, 10)
    }
    if (collection instanceof List) {
      state = state.setIn(collectionsPath.concat([collectionKey, entryKey]), collection.toSet())
    } else {
      state = convertCollections(state, collectionsPath.concat(collectionKey), collection, entryKey)
    }
  })
  return state
}

const preloadState = () => {
  // Grab the state from a global variable injected into the server-generated HTML
  // https://redux.js.org/recipes/server-rendering#the-client-side
  const preloadedState = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__  // Allow garbage collection

  let state = Map()
  if (preloadedState) {
    state = fromJS(preloadedState)

    Object.keys(MODEL_TYPES).forEach(key => {
      // Convert to typed models
      const modelPath = ['models', key, 'byKey']
      const models = state.getIn(modelPath)
      if (models) {
        state = state.setIn(modelPath, models.map(o => new MODEL_TYPES[key](o)))
      }

      // Convert collection Lists to Sets
      // Turn collection keys to integers if it is a number
      const collectionsPath = ['models', key, 'collections']
      const collections = state.getIn(collectionsPath)
      if (collections) {
        collections.forEach((collectionEntries, collectionKey) => {
          state = convertCollections(state, collectionsPath, collectionEntries, collectionKey)
        })
      }
    })

    // Remove the script tag
    const preload = document.getElementById('preloaded-state-server-side')
    if (preload && preload.parentNode) {
      preload.parentNode.removeChild(preload)
    }
  }
  return state
}
export default preloadState
