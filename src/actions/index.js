import * as types from '../constants/ActionTypes'
import * as sources from '../constants/DataSources'
import db, { addEvent, addEvents, addEventTeams, addMatches, addTeam, addTeams, addTeamEvents } from '../database/db'
import Match from '../database/Match'

// This is Eugene's key. If you abuse it, he will hunt you down.
const TBA_KEY = '61bdelekzYp5TY5MueT8OokJsgT1ewwLjywZnTKCAYPCLDeoNnURu1O61DeNy8z3'

// App Bar / Nav Drawer
export const incrementLoadingCount = () => ({
  type: types.INCREMENT_LOADING_COUNT,
})

export const decrementLoadingCount = () => ({
  type: types.DECREMENT_LOADING_COUNT,
})

export const toggleOffline = () => ({
  type: types.TOGGLE_OFFLINE,
})

export const toggleMobileDrawer = () => ({
  type: types.TOGGLE_MOBILE_DRAWER,
})

export const closeMobileDrawer = () => ({
  type: types.CLOSE_MOBILE_DRAWER,
})

// Resetting Page
export const resetPage = () => ({
  type: types.RESET_PAGE,
})

// Event Page
export const receiveEventInfo = (eventKey, data, source) => ({
  type: types.RECEIVE_EVENT_INFO,
  eventKey,
  data,
  source,
})

export function fetchEventInfo(eventKey) {
  return (dispatch, getState) => {
    // Update from IndexedDB
    db.events.get(eventKey).then(event => {
      dispatch(receiveEventInfo(eventKey, event, sources.IDB))
    })

    // Update from API
    if (!getState().getIn(['appNav', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(event => {
        if (event) {
          dispatch(receiveEventInfo(eventKey, event, sources.API))
          addEvent(event)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveEventMatches = (eventKey, matches, source) => ({
  type: types.RECEIVE_EVENT_MATCHES,
  eventKey,
  data: matches.map(match => new Match(match)),
  source,
})

export function fetchEventMatches(eventKey) {
  return (dispatch, getState) => {
    // Update from IndexedDB
    db.matches.where('event_key').equals(eventKey).toArray(matches => {
      dispatch(receiveEventMatches(eventKey, matches, sources.IDB))
    })

    // Update from API
    if (!getState().getIn(['appNav', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(matches => {
        if (matches) {
          dispatch(receiveEventMatches(eventKey, matches, sources.API))
          addMatches(matches)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveEventTeams = (eventKey, data, source) => ({
  type: types.RECEIVE_EVENT_TEAMS,
  eventKey,
  data,
  source,
})

export function fetchEventTeams(eventKey) {
  return (dispatch, getState) => {
    // Update from IndexedDB
    db.eventTeams.where('eventKey').equals(eventKey).toArray(eventTeams => {
      Promise.all(
        eventTeams.map(eventTeam => db.teams.get(eventTeam.teamKey))
      ).then(teams => {
        dispatch(receiveEventTeams(eventKey, teams, sources.IDB))
      })
    })

    // Update from API
    if (!getState().getIn(['appNav', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(teams => {
        if (teams) {
          dispatch(receiveEventTeams(eventKey, teams, sources.API))
          addEventTeams(eventKey, teams)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

// Event List Page
export const receiveYearEvents = (year, data, source) => ({
  type: types.RECEIVE_YEAR_EVENTS,
  year,
  data,
  source,
})

export function fetchYearEvents(year) {
  return (dispatch, getState) => {
    // Update from IndexedDB
    db.events.where('year').equals(year).toArray(events => {
      dispatch(receiveYearEvents(year, events, sources.IDB))
    })

    // Update from API
    if (!getState().getIn(['appNav', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/events/${year}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(events => {
        if (events) {
          dispatch(receiveYearEvents(year, events, sources.API))
          addEvents(events)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

// Team Page
export const receiveTeamInfo = (teamKey, data, source) => ({
  type: types.RECEIVE_TEAM_INFO,
  teamKey,
  data,
  source,
})

export function fetchTeamInfo(teamNumber) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    // Update from IndexedDB
    db.teams.get(teamKey).then(team => {
      dispatch(receiveTeamInfo(teamKey, team, sources.IDB))
    })

    // Update from API
    if (!getState().getIn(['appNav', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(team => {
        if (team) {
          dispatch(receiveTeamInfo(teamKey, team, sources.API))
          addTeam(team)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveTeamYearEvents = (teamKey, year, data, source) => ({
  type: types.RECEIVE_TEAM_YEAR_EVENTS,
  teamKey,
  year,
  data,
  source,
})

export function fetchTeamYearEvents(teamNumber, year) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    // Update from IndexedDB
    db.eventTeams.where('teamKey_year').equals(`${teamKey}_${year}`).toArray(eventTeams => {
      Promise.all(
        eventTeams.map(eventTeam => db.events.get(eventTeam.eventKey))
      ).then(events => {
        dispatch(receiveTeamYearEvents(teamKey, year, events, sources.IDB))
      })
    })

    // Update from API
    if (!getState().getIn(['appNav', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/events/${year}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(events => {
        if (events) {
          dispatch(receiveTeamYearEvents(teamKey, year, events, sources.API))
          addTeamEvents(teamKey, events)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

// Team List Page
export const receiveTeamListPage = (pageNum, data, source) => ({
  type: types.RECEIVE_TEAM_LIST_PAGE,
  pageNum,
  data,
  source,
})

export function fetchTeamListHelper(pageNum) {
  return (dispatch, getState) => {
    // Update from IndexedDB
    db.teams.where('team_number').between(pageNum * 500, pageNum * 500 + 500).toArray(teams => {
      dispatch(receiveTeamListPage(pageNum, teams, sources.IDB))
    })

    // Update from API
    if (!getState().getIn(['appNav', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/teams/${pageNum}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(teams => {
        if (teams) {
          dispatch(receiveTeamListPage(pageNum, teams, sources.API))
          addTeams(teams)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export function fetchTeamListAll() {
  return (dispatch) => {
    // Load partial first
    db.teams.where('team_number').between(0, 20).toArray(teams => {
      dispatch(receiveTeamListPage(0, teams, sources.IDB_FAST))
    })
    for (let pageNum=0; pageNum<14; pageNum++) {
      dispatch(fetchTeamListHelper(pageNum))
    }
  }
}
