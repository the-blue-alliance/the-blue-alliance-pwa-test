import { actionTypes } from 'react-redux-firebase'
import * as types from './constants/ActionTypes'
import { fetchUserFavorites } from './actions'
import { clearUserData } from './database/db'

export const userManagerMiddleware = store => next => action => {
  next(action)
  if (action.type === actionTypes.LOGIN) {
    store.dispatch(fetchUserFavorites())
  } else if (action.type === actionTypes.AUTH_EMPTY_CHANGE) {
    store.dispatch({
      type: types.CLEAR_USER_DATA,
    })
    clearUserData()
  }
}
