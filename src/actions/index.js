import * as types from '../constants/ActionTypes'
import * as sources from '../constants/DataSources'
import db, { addAwards, addEvent, addEvents, addEventTeams, addMatch, addMatches, addTeam, addTeams, addTeamEvents } from '../database/db'
import fetch from 'isomorphic-fetch'

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

export const setBottomNav = (value) => ({
  type: types.SET_BOTTOM_NAV_VALUE,
  value,
})

// Resetting Page
export function resetPage(defaultState) {
  return (dispatch, getState) => {
    dispatch({
      type: types.RESET_PAGE,
      pageKey: getState().getIn(['router', 'location', 'key']),
      defaultState,
    })
  }
}

// Set page state
export function setPageState(pageState) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_PAGE_STATE,
      pageKey: getState().getIn(['router', 'location', 'key']),
      pageState,
    })
  }
}

export function setScrollState(scrollId, scrollTop) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_SCROLL_STATE,
      pageKey: getState().getIn(['router', 'location', 'key']),
      scrollId,
      scrollTop,
    })
  }
}

// Snackbars
export const openSnackbar = (value) => ({
  type: types.OPEN_SNACKBAR,
  value,
})

export const closeSnackbar = () => ({
  type: types.CLOSE_SNACKBAR,
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
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(event => {
        if (dataSource < sources.API && event !== undefined) {
          dataSource = sources.API
          dispatch(receiveEventInfo(eventKey, event))
          addEvent(event)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveEventMatches = (eventKey, matches) => ({
  type: types.RECEIVE_EVENT_MATCHES,
  eventKey,
  data: matches,
})

export function fetchEventMatches(eventKey) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.matches.where('event_key').equals(eventKey).toArray().then(matches => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveEventMatches(eventKey, matches))
      }
    })

    // Update from API
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(matches => {
        if (dataSource < sources.API && matches !== undefined) {
          dataSource = sources.API
          dispatch(receiveEventMatches(eventKey, matches))
          addMatches(matches)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveEventTeams = (eventKey, teams) => ({
  type: types.RECEIVE_EVENT_TEAMS,
  eventKey,
  data: teams,  // TODO: create Team object
})

export function fetchEventTeams(eventKey) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.eventTeams.where('eventKey').equals(eventKey).toArray().then(eventTeams => {
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
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(teams => {
        if (dataSource < sources.API && teams !== undefined) {
          dataSource = sources.API
          dispatch(receiveEventTeams(eventKey, teams))
          addEventTeams(eventKey, teams)
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
  data: events,  // TODO: create Event object
})

export function fetchYearEvents(year) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.events.where('year').equals(year).toArray().then(events => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveYearEvents(year, events))
      }
    })

    // Update from API
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/events/${year}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(events => {
        if (dataSource < sources.API && events !== undefined) {
          dataSource = sources.API
          dispatch(receiveYearEvents(year, events))
          addEvents(events)
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
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(team => {
        if (dataSource < sources.API && team !== undefined) {
          dataSource = sources.API
          dispatch(receiveTeamInfo(teamKey, team))
          addTeam(team)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveTeamYearAwards = (teamKey, year, awards) => ({
  type: types.RECEIVE_TEAM_YEAR_AWARDS,
  teamKey,
  year,
  data: awards,
})

export function fetchTeamYearAwards(teamNumber, year) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    const teamKey = `frc${teamNumber}`
    // Update from IndexedDB
    db.awardTeams.where('teamKey_year').equals(`${teamKey}_${year}`).toArray().then(awardTeams => {
      Promise.all(
        awardTeams.map(awardTeam => db.awards.get(awardTeam.awardKey))
      ).then(awards => {
        if (dataSource < sources.IDB) {
          dataSource = sources.IDB
          dispatch(receiveTeamYearAwards(teamKey, year, awards))
        }
      })
    })

    // Update from API
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/awards/${year}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(awards => {
        // Add keys to awards
        return awards.map(award => {
          var newAward = Object.assign({}, award)
          newAward.key = `${award.event_key}_${award.award_type}`
          return newAward
        })
      }).then(awards => {
        if (dataSource < sources.API && awards !== undefined) {
          dataSource = sources.API
          dispatch(receiveTeamYearAwards(teamKey, year, awards))
          addAwards(awards)
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
  data: events,  // TODO: create Event object
})

export function fetchTeamYearEvents(teamNumber, year) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    const teamKey = `frc${teamNumber}`
    // Update from IndexedDB
    db.eventTeams.where('teamKey_year').equals(`${teamKey}_${year}`).toArray().then(eventTeams => {
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
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/events/${year}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(events => {
        if (dataSource < sources.API && events !== undefined) {
          dataSource = sources.API
          dispatch(receiveTeamYearEvents(teamKey, year, events))
          addTeamEvents(teamKey, events)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

export const receiveTeamYearMatches = (teamKey, year, matches) => ({
  type: types.RECEIVE_TEAM_YEAR_MATCHES,
  teamKey,
  year,
  data: matches,
})

export function fetchTeamYearMatches(teamNumber, year) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    const teamKey = `frc${teamNumber}`
    // Update from IndexedDB
    db.matchTeams.where('teamKey_year').equals(`${teamKey}_${year}`).toArray().then(matchTeams => {
      Promise.all(
        matchTeams.map(matchTeam => db.matches.get(matchTeam.matchKey))
      ).then(matches => {
        if (dataSource < sources.IDB) {
          dataSource = sources.IDB
          dispatch(receiveTeamYearMatches(teamKey, year, matches))
        }
      })
    })

    // Update from API
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/matches/${year}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(matches => {
        if (dataSource < sources.API && matches !== undefined) {
          dataSource = sources.API
          dispatch(receiveTeamYearMatches(teamKey, year, matches))
          addMatches(matches)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}

// Team List Page
export const receiveTeamListPage = (teams) => ({
  type: types.RECEIVE_TEAM_LIST_PAGE,
  data: teams,  // TODO: create Team object
})

export function fetchTeamListHelper(pageNum) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT

    // Load partial first
    if (pageNum === 0) {
      db.teams.where('team_number').between(0, 20).toArray().then(teams => {
        if (dataSource < sources.IDB_FAST) {
          dataSource = sources.IDB_FAST
          dispatch(receiveTeamListPage(teams))
        }
      })
    }

    // Update from IndexedDB
    db.teams.where('team_number').between(pageNum * 500, pageNum * 500 + 500).toArray().then(teams => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveTeamListPage(teams))
      }
    })

    // Update from API
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/teams/${pageNum}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(teams => {
        if (dataSource < sources.API && teams !== undefined) {
          dataSource = sources.API
          dispatch(receiveTeamListPage(teams))
          addTeams(teams)
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

// Match Page
export const receiveMatchInfo = (matchKey, data) => ({
  type: types.RECEIVE_MATCH_INFO,
  matchKey,
  data,
})

export function fetchMatchInfo(matchKey) {
  return (dispatch, getState) => {
    let dataSource = sources.DEFAULT
    // Update from IndexedDB
    db.matches.get(matchKey).then(match => {
      if (dataSource < sources.IDB) {
        dataSource = sources.IDB
        dispatch(receiveMatchInfo(matchKey, match))
      }
    })

    // Update from API
    if (!getState().getIn(['appState', 'offlineOnly'])) {
      dispatch(incrementLoadingCount())
      fetch(`https://www.thebluealliance.com/api/v3/match/${matchKey}`,
        {headers: {'X-TBA-Auth-Key': TBA_KEY}
      }).then(
        response => response.json(),
        error => console.log('An error occured.', error)
      ).then(match => {
        if (dataSource < sources.API && match !== undefined) {
          dataSource = sources.API
          dispatch(receiveMatchInfo(matchKey, match))
          addMatch(match)
        }
        dispatch(decrementLoadingCount())
      })
    }
  }
}
