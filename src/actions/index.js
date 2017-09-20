import * as types from '../constants/ActionTypes'

// This is Eugene's key. If you abuse it, he will hunt you down.
const TBA_KEY = '61bdelekzYp5TY5MueT8OokJsgT1ewwLjywZnTKCAYPCLDeoNnURu1O61DeNy8z3'

// Event Page
export const requestEventInfo = (eventKey) => ({
  type: types.REQUEST_EVENT_INFO,
  eventKey,
})

export const receiveEventInfo = (eventKey, data) => ({
  type: types.RECEIVE_EVENT_INFO,
  eventKey,
  data,
  receivedAt: Date.now(),
})

export function fetchEventInfo(eventKey) {
  return (dispatch) => {
    dispatch(requestEventInfo(eventKey))
    return fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(event => {
      dispatch(receiveEventInfo(eventKey, event))
    })
  }
}

export const requestEventTeams = (eventKey) => ({
  type: types.REQUEST_EVENT_TEAMS,
  eventKey,
})

export const receiveEventTeams = (eventKey, data) => ({
  type: types.RECEIVE_EVENT_TEAMS,
  eventKey,
  data,
  receivedAt: Date.now(),
})

export function fetchEventTeams(eventKey) {
  return (dispatch) => {
    dispatch(requestEventTeams(eventKey))
    return fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(teams => {
      dispatch(receiveEventTeams(eventKey, teams))
    })
  }
}

// Event List Page
export const requestYearEvents = (year) => ({
  type: types.REQUEST_YEAR_EVENTS,
  year,
})

export const receiveYearEvents = (year, data) => ({
  type: types.RECEIVE_YEAR_EVENTS,
  year,
  data,
  receivedAt: Date.now(),
})

export function fetchYearEvents(year) {
  return (dispatch) => {
    dispatch(requestYearEvents(year))
    return fetch(`https://www.thebluealliance.com/api/v3/events/${year}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(events => {
      dispatch(receiveYearEvents(year, events))
    })
  }
}
// Team Page
export const requestTeamInfo = (teamKey) => ({
  type: types.REQUEST_TEAM_INFO,
  teamKey,
})

export const receiveTeamInfo = (teamKey, data) => ({
  type: types.RECEIVE_TEAM_INFO,
  teamKey,
  data,
  receivedAt: Date.now(),
})

export function fetchTeamInfo(teamNumber) {
  return (dispatch) => {
    const teamKey = `frc${teamNumber}`
    dispatch(requestTeamInfo(teamKey))
    return fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(team => {
      dispatch(receiveTeamInfo(teamKey, team))
    })
  }
}

export const requestTeamYearEvents = (teamKey, year) => ({
  type: types.REQUEST_TEAM_YEAR_EVENTS,
  teamKey,
  year,
})

export const receiveTeamYearEvents = (teamKey, year, data) => ({
  type: types.RECEIVE_TEAM_YEAR_EVENTS,
  teamKey,
  year,
  data,
  receivedAt: Date.now(),
})

export function fetchTeamYearEvents(teamNumber, year) {
  return (dispatch) => {
    const teamKey = `frc${teamNumber}`
    dispatch(requestTeamYearEvents(teamKey, year))
    return fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/events/${year}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(events => {
      dispatch(receiveTeamYearEvents(teamKey, year, events))
    })
  }
}

// Team List Page
export const requestTeamListPage = (pageNum) => ({
  type: types.REQUEST_TEAM_LIST_PAGE,
  pageNum,
})

export const receiveTeamListPage = (pageNum, data) => ({
  type: types.RECEIVE_TEAM_LIST_PAGE,
  pageNum,
  data,
  receivedAt: Date.now(),
})

export function fetchTeamListHelper(pageNum) {
  return (dispatch) => {
    dispatch(requestTeamListPage(pageNum))
    return fetch(`https://www.thebluealliance.com/api/v3/teams/${pageNum}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(teams => {
      dispatch(receiveTeamListPage(pageNum, teams))
    })
  }
}

export function fetchTeamListAll() {
  return (dispatch) => {
    for (let pageNum=0; pageNum<14; pageNum++) {
      dispatch(fetchTeamListHelper(pageNum))
    }
  }
}
