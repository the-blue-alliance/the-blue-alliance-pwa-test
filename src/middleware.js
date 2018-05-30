import { actionTypes } from 'react-redux-firebase'
import fetch from 'isomorphic-fetch'
import * as types from './constants/ActionTypes'

export const manageFavoritesMiddleware = store => next => action => {
  next(action)
  if (action.type === actionTypes.LOGIN) {
    const token = store.getState().get('firebase').auth.stsTokenManager.accessToken
    fetch('https://www.thebluealliance.com/_ah/api/tbaMobile/v9/favorites/list', {
      headers: {'Authorization': 'Bearer ' + token},
      method: 'POST',
    }).then(response => response.json()).then(favorites => {
      store.dispatch({
        type: types.SET_USER_FAVORITES,
        favorites: favorites,
      })
    })
  } else if (action.type === actionTypes.LOGOUT) {
    store.dispatch({
      type: types.CLEAR_USER_FAVORITES,
    })
  }
}
