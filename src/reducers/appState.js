import * as types from '../constants/ActionTypes';
import { Map } from 'immutable';

const updateLoadingCount = (state = 0, action) => {
  switch (action.type) {
    case types.INCREMENT_LOADING_COUNT:
      return state + 1
    case types.DECREMENT_LOADING_COUNT:
      return state - 1
    default:
      return state
  }
}

const appState = (state = Map({
  loadingCount: 0,
  darkTheme: false,
  apiEnabled: true,
  idbEnabled: true,
  navValue: 'home',
  snackbar: null,
}), action) => {
  switch (action.type) {
    case types.INCREMENT_LOADING_COUNT:
    case types.DECREMENT_LOADING_COUNT:
      return state
        .set('loadingCount', updateLoadingCount(state.get('loadingCount'), action))
    case types.TOGGLE_THEME:
      return state
        .set('darkTheme', !state.get('darkTheme'))
    case types.TOGGLE_API:
      return state
        .set('apiEnabled', !state.get('apiEnabled'))
    case types.TOGGLE_IDB:
      return state
        .set('idbEnabled', !state.get('idbEnabled'))
    case types.SET_NAV_VALUE:
      return state
        .set('navValue', action.value)
    case types.OPEN_SNACKBAR:
      return state
        .set('snackbar', action.value)
    case types.CLOSE_SNACKBAR:
      return state
        .set('snackbar', null)
    default:
      return state
  }
}
export default appState
