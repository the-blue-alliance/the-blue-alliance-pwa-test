import { createSelector } from 'reselect'
import { List, Map } from 'immutable'

let CMP_TYPES = new Set()
CMP_TYPES.add(3)
CMP_TYPES.add(4)

let SEASON_TYPES = new Set()
SEASON_TYPES.add(0)
SEASON_TYPES.add(1)
SEASON_TYPES.add(2)
SEASON_TYPES.add(5)

const getEvents = (state, props) =>
  state.getIn(['models', 'events', 'byKey'])

const getYearEventKeys = (state, props) => {
  return state.getIn(['models', 'events', 'collections', 'byYear', 2017])
}

export const getYearEventsByWeekTab = createSelector(
  [getEvents, getYearEventKeys],
  (events, eventKeys) => {
    let yearEventTabs = Map({
      'tabNames': List().asMutable(),
      'tabsByEventType': List().asMutable(),
    }).asMutable()


    if (events && eventKeys) {
      let yearEvents = eventKeys.map(ek => events.get(ek))

      yearEvents = yearEvents.sort((a, b) => {
        if (a.get('start_date') < b.get('start_date')) {
          return -1
        }
        if (a.get('start_date') > b.get('start_date')) {
          return 1
        }
        return 0
      })

      let tabIdx = -1
      let lastTabName = null
      let tabName = null
      yearEvents.forEach(event => {
        // Create tabs
        if (CMP_TYPES.has(event.get('event_type'))) {
          if (event.get('year') >= 2017) {
            tabName = `${event.get('city')} Championship`
          } else {
            tabName = 'Championship'
          }
        } else if (event.get('week') != null) {
          tabName = `Week ${event.get('week') + 1}`
        } else if (event.get('event_type') === 100) {
          tabName = 'Preseason'
        } else {
          tabName = 'Offseason'
        }

        if (tabName !== lastTabName) {
          yearEventTabs.get('tabNames').push(tabName)
          lastTabName = tabName
          tabIdx++
        }

        // Create tab content
        if (yearEventTabs.getIn(['tabsByEventType', tabIdx])) {
          yearEventTabs.getIn(['tabsByEventType', tabIdx]).push(event)
        } else {
          yearEventTabs.setIn(['tabsByEventType', tabIdx], List([event]).asMutable())
        }
      })
    }
    return yearEventTabs.asImmutable()
  }
)
