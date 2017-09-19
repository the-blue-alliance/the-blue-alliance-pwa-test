import { createSelector } from 'reselect'

let CMP_TYPES = new Set()
CMP_TYPES.add(3)
CMP_TYPES.add(4)

let SEASON_TYPES = new Set()
SEASON_TYPES.add(0)
SEASON_TYPES.add(1)
SEASON_TYPES.add(2)
SEASON_TYPES.add(5)


const getEvents = state => state.database.events
const getYearEvents = state => {
  if (state.database.yearEvents && state.database.yearEvents[2017]) {
    return state.database.yearEvents[2017].data
  } else {
    return null
  }
}

export const getYearEventTabs = createSelector(
  [getEvents, getYearEvents],
  (events, yearEventKeys) => {
    let yearEventTabs = {
      'tabNames': [],
      'tabsByEventType': [],
    }

    if (yearEventKeys) {
      const yearEvents = yearEventKeys.map(
        yearEventKey => events[yearEventKey])
      yearEvents.sort((a, b) => {
        if (a.start_date < b.start_date) {
          return -1
        }
        if (a.start_date > b.start_date) {
          return 1
        }
        return 0
      })

      let tabIdx = -1
      let lastTabName = null
      let tabName = null
      yearEvents.forEach(event => {
        // Create tabs
        if (CMP_TYPES.has(event.event_type)) {
          if (event.year >= 2017) {
            tabName = `${event.city} Championship`
          } else {
            tabName = 'Championship'
          }
        } else if (event.week != null) {
          tabName = `Week ${event.week + 1}`
        } else if (event.event_type === 100) {
          tabName = 'Preseason'
        } else {
          tabName = 'Offseason'
        }

        if (tabName !== lastTabName) {
          yearEventTabs.tabNames.push(tabName)
          lastTabName = tabName
          tabIdx++
        }

        // Create tab content
        if (yearEventTabs.tabsByEventType[tabIdx]) {
          yearEventTabs.tabsByEventType[tabIdx].push(event)
        } else {
          yearEventTabs.tabsByEventType[tabIdx] = [event]
        }
      })
    }
    return yearEventTabs
  }
)
