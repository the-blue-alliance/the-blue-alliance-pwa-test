import * as types from '../constants/ActionTypes'

// This is Eugene's key. If you abuse it, he will hunt you down.
const TBA_KEY = '61bdelekzYp5TY5MueT8OokJsgT1ewwLjywZnTKCAYPCLDeoNnURu1O61DeNy8z3'

export const setTeamList = (teams) => ({
  type: types.SET_TEAM_LIST,
  teams,
})

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
      teams.map(team => dispatch(receiveTeamInfo(team.team_number, team)))
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
    ).then(event => {
      dispatch(receiveYearEvents(year, event))
    })
  }
}

// Team Page
export const requestTeamInfo = (teamNumber) => ({
  type: types.REQUEST_TEAM_INFO,
  teamNumber,
})

export const receiveTeamInfo = (teamNumber, data) => ({
  type: types.RECEIVE_TEAM_INFO,
  teamNumber,
  data,
  receivedAt: Date.now(),
})

export function fetchTeamInfo(teamNumber) {
  return (dispatch) => {
    dispatch(requestTeamInfo(teamNumber))
    return fetch(`https://www.thebluealliance.com/api/v3/team/frc${teamNumber}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(team => {
      dispatch(receiveTeamInfo(teamNumber, team))
    })
  }
}

export const requestTeamYearEvents = (teamNumber, year) => ({
  type: types.REQUEST_TEAM_YEAR_EVENTS,
  teamNumber,
  year,
})

export const receiveTeamYearEvents = (teamNumber, year, data) => ({
  type: types.RECEIVE_TEAM_YEAR_EVENTS,
  teamNumber,
  year,
  data,
  receivedAt: Date.now(),
})

export function fetchTeamYearEvents(teamNumber, year) {
  return (dispatch) => {
    dispatch(requestTeamYearEvents(teamNumber, year))
    return fetch(`https://www.thebluealliance.com/api/v3/team/frc${teamNumber}/events/${year}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(events => {
      dispatch(receiveTeamYearEvents(teamNumber, year, events))
      events.map(event => dispatch(receiveEventInfo(event.key, event)))
    })
  }
}
