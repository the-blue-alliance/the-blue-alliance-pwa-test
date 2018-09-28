import { createSelector } from 'reselect'
import { Map } from 'immutable';
import moment from 'moment'

// Pages
const getCurrentPageKey = (state, props) => {
  return state.getIn(['page', 'currentKey'])
}

const getCurrentModalKey = (state, props) => {
  return state.getIn(['page', 'currentModalKey'])
}

const getStateHistory = (state, props) => {
  return state.getIn(['page', 'stateHistory'])
}

export const getCurrentYear = (state) => {
  const year = state.getIn(['models', 'config', 'byKey', 'API_STATUS', 'current_season'])
  return year ? year : moment().year()
}

export const getMaxYear = (state) => {
  const year = state.getIn(['models', 'config', 'byKey', 'API_STATUS', 'max_season'])
  return year ? year : moment().year()
}

export const getCurrentPageState = createSelector(
  [getCurrentPageKey, getStateHistory],
  (pageKey, stateHistory) => {
    const pageState = stateHistory.get(pageKey)
    return pageState === undefined ? Map() : pageState
  }
)

// Scroll
const getScrollHistory = (state, props) => {
  return state.getIn(['page', 'scrollHistory'])
}

export const getCurrentScrollStates = createSelector(
  [getCurrentPageKey, getCurrentModalKey, getScrollHistory],
  (pageKey, modalKey, scrollHistory) => {
    const pageScrollStates = scrollHistory.get(pageKey) || Map()
    const modalScrollStates = scrollHistory.get(modalKey) || Map()
    return pageScrollStates.merge(modalScrollStates)
  }
)

// Modals
const getStateHistoryModal = (state, props) => {
  return state.getIn(['page', 'stateHistoryModal'])
}

export const getCurrentModalState = createSelector(
  [getCurrentModalKey, getStateHistoryModal],
  (modalKey, stateHistory) => {
    const modalState = stateHistory.get(modalKey)
    return modalState === undefined ? Map() : modalState
  }
)

// Misc
export const getYear = (state, props) => {
  // TODO: use API status
  if (props.year) {
    return props.year
  }
  if (props.eventKey) {
    return parseInt(props.eventKey.substring(0, 4), 10)
  }
  const year = parseInt(props.match.params.year, 10)
  return year ? year : getCurrentYear(state)
}
