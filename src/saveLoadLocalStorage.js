import { fromJS, Map, Set } from 'immutable'

export const loadAppState = () => {
  try {
    const serializedState = localStorage.getItem('appStatePartial')
    if (serializedState === null) {
      return Map()
    }
    return fromJS(JSON.parse(serializedState))
  } catch (err) {
    return Map()
  }
}

let lastPartialState = Map()
export const saveAppState = (state) => {
  try {
    const appState = state.get('appState')
    var keySet = Set([
      'darkTheme',
      'apiEnabled',
      'idbEnabled',
    ]).toMap()
    const partialState = lastPartialState.mergeDeep(keySet.map(function(key) {
      return appState.get(key)
    }))
    if (lastPartialState !== partialState) {
      const serializedState = JSON.stringify(partialState.toJS())
      localStorage.setItem('appStatePartial', serializedState)
    }
    lastPartialState = partialState
  } catch (err) {
  }
}
