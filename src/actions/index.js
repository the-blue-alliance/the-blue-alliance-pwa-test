import { List, fromJS } from 'immutable';
import * as types from '../constants/ActionTypes'
import * as sources from '../constants/DataSources'
import db, { addEvent, addEvents, addEventTeams, addMatches, addTeam, addTeams, addTeamEvents } from '../database/db'
import Match from '../database/Match'

// TODO: This can use a lot of refactoring to make things DRY. 2017-09-27 @fangeugene

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
export const receiveEventInfo = (eventKey, data) => ({
  type: types.RECEIVE_EVENT_INFO,
  eventKey,
  data,
})

export function fetchEventInfo(eventKey) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.events.get(eventKey).then(event => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveEventInfo(eventKey, event))
      }
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
        if (dataSource < sources.API) {
          dataSource = sources.API
          if (event) {
            dispatch(receiveEventInfo(eventKey, event))
            addEvent(event)
          }
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveEventMatches = (eventKey, matches) => ({
  type: types.RECEIVE_EVENT_MATCHES,
  eventKey,
  data: List(matches.map(match => new Match(fromJS(match)))),
})

export function fetchEventMatches(eventKey) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.matches.where('event_key').equals(eventKey).toArray(matches => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveEventMatches(eventKey, matches))
      }
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
        if (dataSource < sources.API) {
          dataSource = sources.API
          if (matches) {
            dispatch(receiveEventMatches(eventKey, matches))
            addMatches(matches)
          }
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveEventTeams = (eventKey, teams) => ({
  type: types.RECEIVE_EVENT_TEAMS,
  eventKey,
  data: List(fromJS(teams)),  // TODO: create Team object
})

export function fetchEventTeams(eventKey) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.eventTeams.where('eventKey').equals(eventKey).toArray(eventTeams => {
      Promise.all(
        eventTeams.map(eventTeam => db.teams.get(eventTeam.teamKey))
      ).then(teams => {
        if (dataSource < sources.IDB) {
          dataSource = sources.IDB
          dispatch(receiveEventTeams(eventKey, teams))
        }
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
        if (dataSource < sources.API) {
          dataSource = sources.API
          if (teams) {
            dispatch(receiveEventTeams(eventKey, teams))
            addEventTeams(eventKey, teams)
          }
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

// Event List Page
export const receiveYearEvents = (year, events) => ({
  type: types.RECEIVE_YEAR_EVENTS,
  year,
  data: List(fromJS(events)),  // TODO: create Event object
})

export function fetchYearEvents(year) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.events.where('year').equals(year).toArray(events => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveYearEvents(year, events))
      }
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
        if (dataSource < sources.API) {
          dataSource = sources.API
          if (events) {
            dispatch(receiveYearEvents(year, events))
            addEvents(events)
          }
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

// Team Page
export const receiveTeamInfo = (teamKey, data) => ({
  type: types.RECEIVE_TEAM_INFO,
  teamKey,
  data,
})

export function fetchTeamInfo(teamNumber) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    const teamKey = `frc${teamNumber}`
    // Update from IndexedDB
    db.teams.get(teamKey).then(team => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveTeamInfo(teamKey, team))
      }
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
        if (dataSource < sources.API) {
          dataSource = sources.API
          if (team) {
            dispatch(receiveTeamInfo(teamKey, team))
            addTeam(team)
          }
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveTeamYearEvents = (teamKey, year, events) => ({
  type: types.RECEIVE_TEAM_YEAR_EVENTS,
  teamKey,
  year,
  data: List(fromJS(events)),  // TODO: create Event object
})

export function fetchTeamYearEvents(teamNumber, year) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    const teamKey = `frc${teamNumber}`
    // Update from IndexedDB
    db.eventTeams.where('teamKey_year').equals(`${teamKey}_${year}`).toArray(eventTeams => {
      Promise.all(
        eventTeams.map(eventTeam => db.events.get(eventTeam.eventKey))
      ).then(events => {
        if (dataSource < sources.IDB) {
          dataSource = sources.IDB
          dispatch(receiveTeamYearEvents(teamKey, year, events))
        }
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
        if (dataSource < sources.API) {
          dataSource = sources.API
          if (events) {
            dispatch(receiveTeamYearEvents(teamKey, year, events))
            addTeamEvents(teamKey, events)
          }
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

// Team List Page
export const receiveTeamListPage = (pageNum, teams) => ({
  type: types.RECEIVE_TEAM_LIST_PAGE,
  pageNum,
  data: List(fromJS(teams)),  // TODO: create Team object
})

export function fetchTeamListHelper(pageNum) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT

    // Load partial first
    if (pageNum === 0) {
      db.teams.where('team_number').between(0, 20).toArray(teams => {
        if (dataSource < sources.IDB_FAST) {
          dataSource = sources.IDB_FAST
          dispatch(receiveTeamListPage(0, teams))
        }
      })
    }

    // Update from IndexedDB
    db.teams.where('team_number').between(pageNum * 500, pageNum * 500 + 500).toArray(teams => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveTeamListPage(pageNum, teams))
      }
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
        if (dataSource < sources.API) {
          dataSource = sources.API
          if (teams) {
            dispatch(receiveTeamListPage(pageNum, teams))
            addTeams(teams)
          }
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export function fetchTeamListAll() {
  return (dispatch) => {
    for (let pageNum=0; pageNum<14; pageNum++) {
      dispatch(fetchTeamListHelper(pageNum))
    }
  }
}
