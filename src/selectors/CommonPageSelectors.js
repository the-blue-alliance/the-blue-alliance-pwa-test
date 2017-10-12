import { createSelector } from 'reselect'
import { Map } from 'immutable';

const getCurrentPageKey = (state, props) => {
  return state.getIn(['page', 'currentKey'])
}

const getStateHistory = (state, props) => {
  return state.getIn(['page', 'stateHistory'])
}

export const getCurrentPageState = createSelector(
  [getCurrentPageKey, getStateHistory],
  (pageKey, stateHistory) => {
    const pageState = stateHistory.get(pageKey)
    return pageState === undefined ? Map() : pageState
  }
)

export const getYear = (state, props) => {
  const year = parseInt(props.match.params.year)
  return year ? year : 2017
}
