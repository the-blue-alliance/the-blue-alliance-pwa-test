import { createSelector } from 'reselect'
import { Map } from 'immutable';

const getCurrentPageKey = (state, props) => {
  return state.getIn(['page', 'currentKey'])
}

const getPageHistory = (state, props) => {
  return state.getIn(['page', 'pageHistory'])
}

export const getCurrentPageState = createSelector(
  [getCurrentPageKey, getPageHistory],
  (pageKey, pageHistory) => {
    const pageState = pageHistory.getIn([pageKey, 'state'])
    return pageState === undefined ? Map() : pageState
  }
)

export const getYear = (state, props) => {
  const year = parseInt(props.match.params.year)
  return year ? year : 2017
}
