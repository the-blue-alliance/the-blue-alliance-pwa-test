import * as types from '../constants/ActionTypes'
import { Map } from 'immutable'


const user = (state = Map({
  favorites: null,
}), action) => {
  switch (action.type) {
    case types.SET_USER_FAVORITES:
      return state.set('favorites', action.favorites)
    case types.CLEAR_USER_FAVORITES:
      return state.set('favorites', null)
    default:
      return state
  }
}
export default user
