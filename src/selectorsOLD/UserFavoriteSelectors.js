import { createSelector } from 'reselect'

export const getFavorites = (state, props) => {
  return state.getIn(['user', 'favorites'])
}

export const getFavoriteTeamKeys = createSelector(
  [getFavorites],
  (favorites) => {
    const ret = new Set()
    if (favorites) {
      for (let fav of favorites) {
        if (fav.model_type === 1) {
          ret.add(fav.model_key)
        }
      }
    }
    return ret
  }
)
