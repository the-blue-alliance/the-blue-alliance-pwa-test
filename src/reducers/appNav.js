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

const appNav = (state = Map({
  loadingCount: 0,
  offlineOnly: false,
}), action) => {
  switch (action.type) {
    case types.INCREMENT_LOADING_COUNT:
    case types.DECREMENT_LOADING_COUNT:
      return state
        .set('loadingCount', updateLoadingCount(state.get('loadingCount'), action))
    case types.TOGGLE_OFFLINE:
      return state
        .set('offlineOnly', !state.get('offlineOnly'))
    default:
      return state
  }
}
export default appNav
