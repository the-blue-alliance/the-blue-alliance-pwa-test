import { createSelector } from 'reselect'

const getEvents = (state, props) =>
  state.getIn(['page', 'events', 'data'])

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
