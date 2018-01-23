import { createSelector } from 'reselect'
import { List, Map, Set } from 'immutable'
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import Event from '../database/Event'
import { slugify } from '../utils'

const getEvents = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const events = state.getIn(['page', 'modelHistory', key, 'events', 'collections', 'byYear', getYear(state, props)])
    if (events !== undefined) {
      return events
    }
  }
}

const getDistrictFilters = (state, props) => {
  return getCurrentPageState(state, props).get('districtFilters')
}

export const getSortedEvents = createSelector(
  [getEvents],
  (events) => {
    if (events) {
      events = events.map(e => new Event(e)).sort((a, b) => {
        if (a.start_date < b.start_date) {
          return -1
        }
        if (a.start_date > b.start_date) {
          return 1
        }
        return 0
      })
    }
    return events
  }
)

// Grouped by preseason, week, championship, FoC, and offseason month
// With applied filters
export const getFilteredGroupedEvents = createSelector(
  [getSortedEvents, getDistrictFilters],
  (events, districtFilters) => {
    let groupedEvents = List()
    if (events) {
      let preseasonEvents = List()
      let weekEvents = List()
      let cmpEvents = List()
      let focEvents = List()
      let offseasonEvents = List()

      events.filter(e => districtFilters.size === 0 || districtFilters.has(e.getIn(['district', 'key'])))
      .forEach(event => {
        if (event.isCMP()) {
          cmpEvents = cmpEvents.push(event)
        } else if (event.isFOC()) {
          focEvents = focEvents.push(event)
        } else if (event.isOfficial()) {
          weekEvents = weekEvents.push(event)
        } else if (event.isPreseason()) {
          preseasonEvents = preseasonEvents.push(event)
        } else {
          offseasonEvents = offseasonEvents.push(event)
        }
      })

      // Preseasons by Month
      let preseasonsByMonth = {}
      preseasonEvents.forEach(event => {
        const month = new Date(event.start_date).toLocaleString('en-us', {month: 'long'})
        if (month in preseasonsByMonth) {
          preseasonsByMonth[month] = preseasonsByMonth[month].push(event)
        } else {
          preseasonsByMonth[month] = List([event])
        }
      })
      for (let month in preseasonsByMonth) {
        groupedEvents = groupedEvents.push(Map({
          label: month,
          slug: slugify(month),
          events: preseasonsByMonth[month],
          isOfficial: false,
        }))
      }

      // Events by Week
      let eventsByWeek = {}
      weekEvents.forEach(event => {
        const week = `Week ${event.week + 1}`
        if (week in eventsByWeek) {
          eventsByWeek[week] = eventsByWeek[week].push(event)
        } else {
          eventsByWeek[week] = List([event])
        }
      })
      for (let week in eventsByWeek) {
        groupedEvents = groupedEvents.push(Map({
          label: week,
          slug: slugify(week),
          events: eventsByWeek[week],
          isOfficial: true,
        }))
      }

      // Championship(s)
      let eventsByCmp = {}
      cmpEvents.forEach(event => {
        const cmp = `${event.city} Championship`
        if (cmp in eventsByCmp) {
          eventsByCmp[cmp] = eventsByCmp[cmp].push(event)
        } else {
          eventsByCmp[cmp] = List([event])
        }
      })
      for (let cmp in eventsByCmp) {
        groupedEvents = groupedEvents.push(Map({
          label: cmp,
          slug: slugify(cmp),
          events: eventsByCmp[cmp],
          isOfficial: true,
        }))
      }

      // FoC
      if (focEvents.size !== 0) {
        groupedEvents = groupedEvents.push(Map({
          label: 'Festival of Champions',
          slug: 'foc',
          events: focEvents,
          isOfficial: true,
        }))
      }

      // Offseasons by Month
      let offseasonsByMonth = {}
      offseasonEvents.forEach(event => {
        const month = new Date(event.start_date).toLocaleString('en-us', {month: 'long'})
        if (month in offseasonsByMonth) {
          offseasonsByMonth[month] = offseasonsByMonth[month].push(event)
        } else {
          offseasonsByMonth[month] = List([event])
        }
      })
      for (let month in offseasonsByMonth) {
        groupedEvents = groupedEvents.push(Map({
          label: month,
          slug: slugify(month),
          events: offseasonsByMonth[month],
          isOfficial: false,
        }))
      }
    }
    return groupedEvents
  }
)

export const getDistricts = createSelector(
  [getSortedEvents],
  (events) => {
    let districts = Set()
    if (events) {
      events.forEach(event => {
        if (event.district) {
          districts = districts.add(event.district)
        }
      })
    }
    return districts.sort((a, b) => {
      if (a.get('display_name') < b.get('display_name')) {
        return -1
      }
      if (a.get('display_name') > b.get('display_name')) {
        return 1
      }
      return 0
    }).toList()
  }
)
