import { createSelector } from 'reselect'
import { List, Map } from 'immutable'

const getEvents = (state, props) =>
  state.getIn(['models', 'events', 'byKey'])

const getYearEventKeys = (state, props) => {
  return state.getIn(['models', 'events', 'collections', 'byYear', 2017])
}

export const getYearEvents = createSelector(
  [getEvents, getYearEventKeys],
  (events, eventKeys) => {
    let yearEvents = null
    if (events && eventKeys) {
      yearEvents = eventKeys.map(ek => events.get(ek)).toList()
      yearEvents = yearEvents.sort((a, b) => {
        if (a.get('start_date') < b.get('start_date')) {
          return -1
        }
        if (a.get('start_date') > b.get('start_date')) {
          return 1
        }
        return 0
      })
    }
    return yearEvents
  }
)
