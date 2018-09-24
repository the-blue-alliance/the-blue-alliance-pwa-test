import { createSelector } from 'reselect'
import { getSortedEvents } from './EventListPageSelectors'

export const getWeekEvents = createSelector(
  [getSortedEvents],
  (events) => {
    if (events) {
      events = events.filter(event => event.isThisWeek())
    }
    return events
  }
)
