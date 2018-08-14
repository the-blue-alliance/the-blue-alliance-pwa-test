import { createSelector } from 'reselect'
import { List, Map, Set } from 'immutable'
import moment from 'moment-timezone'
import unidecode from 'unidecode'
import { getCurrentPageState, getYear } from '../selectors/CommonPageSelectors'
import Event from '../database/Event'
import { slugify } from '../utils'

const getEventsByKey = (state, props) => {
  return state.getIn(['models', 'events', 'byKey'])
}

const getYearEventKeys = (state, props) => {
  return state.getIn(['models', 'events', 'collections', 'byYear', getYear(state, props)])
}

const getYearEvents = createSelector(
  getEventsByKey,
  getYearEventKeys,
  (eventsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => eventsByKey.get(key))
    }
  }
)

const getLocationFilter = (state, props) => {
  return getCurrentPageState(state, props).get('locationFilter')
}

const getDistrictFilters = (state, props) => {
  return getCurrentPageState(state, props).get('districtFilters')
}

// Sort by start date, then end date, then short name
export const getSortedEvents = createSelector(
  [getYearEvents],
  (events) => {
    if (events) {
      events = events.map(e => new Event(e)).sort((a, b) => {
        if (a.start_date < b.start_date) {
          return -1
        }
        if (a.start_date > b.start_date) {
          return 1
        }
        if (a.end_date < b.end_date) {
          return -1
        }
        if (a.end_date > b.end_date) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
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
  [getSortedEvents, getLocationFilter, getDistrictFilters],
  (events, locationFilter, districtFilters) => {
    if (events) {
      const filterLowerCase = locationFilter ? locationFilter.toLowerCase() : ''

      let groupedEvents = List()
      let preseasonEvents = List()
      let weekEvents = List()
      let cmpEvents = List()
      let focEvents = List()
      let offseasonEvents = List()

      events.filter(event => (
        event.getCityStateCountryLower() && unidecode(event.getCityStateCountryLower()).includes(filterLowerCase)
      )).filter(event => {
        return districtFilters && (
          districtFilters.size === 0 ||
          districtFilters.has(event.getIn(['district', 'key'])) ||
          (districtFilters.has('regional') && event.isRegional())
        )
      }).forEach(event => {
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
      if (preseasonEvents.size !== 0) {
        groupedEvents = groupedEvents.push(Map({
          label: 'Preseason',
          slug: 'preseason',
          events: preseasonEvents,
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
        let cmp = 'Championship'
        if (event.year >= 2017) {
          cmp = `${event.city} Championship`
        }
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
        const month = `${moment(event.start_date).format('MMM')} Offseason`
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
      return groupedEvents
    }
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
      if (a.get('abbreviation') < b.get('abbreviation')) {
        return -1
      }
      if (a.get('abbreviation') > b.get('abbreviation')) {
        return 1
      }
      return 0
    }).toList()
  }
)
