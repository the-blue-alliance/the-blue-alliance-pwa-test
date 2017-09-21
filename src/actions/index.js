import * as types from '../constants/ActionTypes'

// This is Eugene's key. If you abuse it, he will hunt you down.
const TBA_KEY = '61bdelekzYp5TY5MueT8OokJsgT1ewwLjywZnTKCAYPCLDeoNnURu1O61DeNy8z3'

// AppBar
export const incrementLoadingCount = () => ({
  type: types.INCREMENT_LOADING_COUNT,
})

export const decrementLoadingCount = () => ({
  type: types.DECREMENT_LOADING_COUNT,
})

// Event Page
export const receiveEventInfo = (eventKey, data) => ({
  type: types.RECEIVE_EVENT_INFO,
  eventKey,
  data,
})

export function fetchEventInfo(eventKey) {
  return (dispatch) => {
    dispatch(incrementLoadingCount())
    return fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(event => {
      dispatch(receiveEventInfo(eventKey, event))
      dispatch(decrementLoadingCount())
    })
  }
}

export const receiveEventTeams = (eventKey, data) => ({
  type: types.RECEIVE_EVENT_TEAMS,
  eventKey,
  data,
})

export function fetchEventTeams(eventKey) {
  return (dispatch) => {
    dispatch(incrementLoadingCount())
    return fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/teams`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(teams => {
      dispatch(receiveEventTeams(eventKey, teams))
      dispatch(decrementLoadingCount())
    })
  }
}

// Event List Page
export const receiveYearEvents = (year, data) => ({
  type: types.RECEIVE_YEAR_EVENTS,
  year,
  data,
})

export function fetchYearEvents(year) {
  return (dispatch) => {
    dispatch(incrementLoadingCount())
    return fetch(`https://www.thebluealliance.com/api/v3/events/${year}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(events => {
      dispatch(receiveYearEvents(year, events))
      dispatch(decrementLoadingCount())
    })
  }
}

// Team Page
export const receiveTeamInfo = (teamKey, data) => ({
  type: types.RECEIVE_TEAM_INFO,
  teamKey,
  data,
})

export function fetchTeamInfo(teamNumber) {
  return (dispatch) => {
    const teamKey = `frc${teamNumber}`
    dispatch(incrementLoadingCount())
    return fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(team => {
      dispatch(receiveTeamInfo(teamKey, team))
      dispatch(decrementLoadingCount())
    })
  }
}

export const receiveTeamYearEvents = (teamKey, year, data) => ({
  type: types.RECEIVE_TEAM_YEAR_EVENTS,
  teamKey,
  year,
  data,
})

export function fetchTeamYearEvents(teamNumber, year) {
  return (dispatch) => {
    const teamKey = `frc${teamNumber}`
    dispatch(incrementLoadingCount())
    return fetch(`https://www.thebluealliance.com/api/v3/team/${teamKey}/events/${year}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(events => {
      dispatch(receiveTeamYearEvents(teamKey, year, events))
      dispatch(decrementLoadingCount())
    })
  }
}

// Team List Page
export const receiveTeamListPage = (pageNum, data) => ({
  type: types.RECEIVE_TEAM_LIST_PAGE,
  pageNum,
  data,
})

export function fetchTeamListHelper(pageNum) {
  return (dispatch) => {
    dispatch(incrementLoadingCount())
    return fetch(`https://www.thebluealliance.com/api/v3/teams/${pageNum}`,
      {headers: {'X-TBA-Auth-Key': TBA_KEY}
    }).then(
      response => response.json(),
      error => console.log('An error occured.', error)
    ).then(teams => {
      dispatch(receiveTeamListPage(pageNum, teams))
      dispatch(decrementLoadingCount())
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
