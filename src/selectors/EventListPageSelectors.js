import { createSelector } from 'reselect'
import { getYear } from '../selectors/CommonPageSelectors'

const getEvents = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const events = state.getIn(['page', 'modelHistory', key, 'events', 'collections', 'byYear', getYear(state, props)])
    if (events !== undefined) {
      return events
    }
  }
}

export const getSortedEvents = createSelector(
  [getEvents],
  (events) => {
    if (events) {
      events = events.sort((a, b) => {
        if (a.get('start_date') < b.get('start_date')) {
          return -1
        }
        if (a.get('start_date') > b.get('start_date')) {
          return 1
        }
        return 0
      })
    }
    return events
  }
)
