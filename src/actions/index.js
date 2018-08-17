import ReactDOM from 'react-dom'
import * as types from '../constants/ActionTypes'
import * as sources from '../constants/DataSources'
import db, {
  addAwards,
  addEvent,
  addEvents,
  addEventTeams,
  addEventRankings,
  addEventAlliances,
  addMatch,
  addMatches,
  addTeamYears,
  addTeam,
  addTeams,
  addTeamEvents,
  addTeamEventStatuses,
  addTeamMedias,
  addUserFavorites,
  augmentAward,
  augmentTeamEventStatus,
  augmentMedia,
} from '../database/db'
import fetch from 'isomorphic-fetch'
import moment from 'moment'

const BASE_URL = 'https://www.thebluealliance.com'
// This is Eugene's key. If you abuse it, he will hunt you down.
const TBA_KEY = '61bdelekzYp5TY5MueT8OokJsgT1ewwLjywZnTKCAYPCLDeoNnURu1O61DeNy8z3'

// App Bar / Nav Drawer
export const incrementLoadingCount = () => ({
  type: types.INCREMENT_LOADING_COUNT,
})

export const decrementLoadingCount = () => ({
  type: types.DECREMENT_LOADING_COUNT,
})

export const toggleAPI = () => ({
  type: types.TOGGLE_API,
})

export const toggleIDB = () => ({
  type: types.TOGGLE_IDB,
})

export const setNav = (value) => ({
  type: types.SET_NAV_VALUE,
  value,
})

// Resetting Page
export function setPageKey(pageKey) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_PAGE_KEY,
      pageKey,
    })
  }
}

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

// Resetting modal
export function resetModal(defaultState) {
  return (dispatch, getState) => {
    dispatch({
      type: types.RESET_MODAL,
      pageKey: getState().getIn(['router', 'location', 'key']),
      defaultState,
    })
  }
}

// Set modal state
export function setModalState(modalState) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_MODAL_STATE,
      pageKey: getState().getIn(['router', 'location', 'key']),
      modalState,
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

const handleErrors = (response) => {
  if (!response.ok) {
    console.log(response)
    throw Error(response.statusText)
  }
  const lastModified = moment(response.headers.get('last-modified')).unix()
  db.apiCalls.put({
    url: response.url.replace(BASE_URL, ''),
    accessTime: moment().unix(),
    lastModifiedTime: lastModified ? lastModified : null,
  })
  return response.json()
}

const doAsync = (fn) => {
  if (typeof window === 'undefined') {
    // Don't do async if SSR
    fn()
  } else if ('requestIdleCallback' in window) {
    requestIdleCallback(() => ReactDOM.unstable_deferredUpdates(() => fn()))
  } else {
    setTimeout(() => ReactDOM.unstable_deferredUpdates(() => fn()), 0)
  }
}

const createFetcher = ({
  dispatch,
  getState,
  endpointUrl,
  fetchOptions, // Options
  fastQuery, // Optional
  query,
  join, // Optional
  isCollection,
  transformData, // Optional
  createAction,
  writeDB,
}) => {
  let dataSource = sources.DEFAULT

  // Update from IndexedDB
  if (typeof window !== 'undefined' && 'indexedDB' in window && getState().getIn(['appState', 'idbEnabled'])) {
    if (fastQuery) {
      const fullQueryFast = join ? fastQuery.toArray().then(join) : fastQuery.toArray()
      Promise.all([fullQueryFast, db.apiCalls.get(endpointUrl)]).then(values => {
        const [data, apiCall] = values
        // If isCollection, make sure we've hit this endpoint before
        doAsync(() => {
          if ((!isCollection || apiCall) && dataSource < sources.IDB_FAST && data !== undefined) {
            dataSource = sources.IDB_FAST
            dispatch(createAction(isCollection ? data : data[0]))
          }
        })
      }).catch(error => {
        console.log(error)
      })
    }

    const fullQuery = join ? query.toArray().then(join) : query.toArray()
    Promise.all([fullQuery, db.apiCalls.get(endpointUrl)]).then(values => {
      const [data, apiCall] = values
      // If isCollection, make sure we've hit this endpoint before
      doAsync(() => {
        if ((!isCollection || apiCall) && dataSource < sources.IDB && data !== undefined) {
          dataSource = sources.IDB
          dispatch(createAction(isCollection ? data : data[0]))
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }

  // Update from API
  if (getState().getIn(['appState', 'apiEnabled'])) {
    dispatch(incrementLoadingCount())
    return fetch(
      BASE_URL + endpointUrl,
      fetchOptions ? fetchOptions : {headers: {'X-TBA-Auth-Key': TBA_KEY}}
    )
    .then(handleErrors)
    .then(data => {
      doAsync(() => {
        if (dataSource < sources.API && data !== undefined) {
          dataSource = sources.API
          if (transformData) {
            data = transformData(data)
          }
          dispatch(createAction(data))

          // Delete old db entries and write new ones
          query.delete()
          writeDB(data)
        }
        dispatch(decrementLoadingCount())
      })
    })
    .catch(error => {
      dispatch(decrementLoadingCount())
      console.log(error)
    })
  }
}

// Event Page
export function fetchEventInfo(eventKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/event/${eventKey}`,
      query: db.events.where('key').equals(eventKey),
      createAction: (event) => {
        return {
          type: types.RECEIVE_EVENT_INFO,
          eventKey,
          data: event,
        }
      },
      writeDB: (event) => {
        addEvent(event)
      },
    })
  }
}

export function fetchEventAwards(eventKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/event/${eventKey}/awards`,
      query: db.awards.where('event_key').equals(eventKey),
      isCollection: true,
      transformData: (awards) => {
       return awards.map(augmentAward)
      },
      createAction: (awards) => {
        return {
          type: types.RECEIVE_EVENT_AWARDS,
          eventKey,
          data: awards,
        }
      },
      writeDB: (awards) => {
        addAwards(awards)
      },
    })
  }
}

export function fetchEventMatches(eventKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/event/${eventKey}/matches`,
      query: db.matches.where('event_key').equals(eventKey),
      isCollection: true,
      createAction: (matches) => {
        return {
          type: types.RECEIVE_EVENT_MATCHES,
          eventKey,
          data: matches,
        }
      },
      writeDB: (matches) => {
        addMatches(matches)
      },
    })
  }
}

export function fetchEventTeams(eventKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/event/${eventKey}/teams`,
      query: db.eventTeams.where('eventKey').equals(eventKey),
      join: (eventTeams) => {
        return Promise.all(eventTeams.map(eventTeam => db.teams.get(eventTeam.teamKey)))
      },
      isCollection: true,
      createAction: (teams) => {
        return {
          type: types.RECEIVE_EVENT_TEAMS,
          eventKey,
          data: teams,
        }
      },
      writeDB: (teams) => {
        addEventTeams(eventKey, teams)
      },
    })
  }
}

export function fetchEventTeamStatuses(eventKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/event/${eventKey}/teams/statuses`,
      query: db.teamEventStatuses.where('eventKey').equals(eventKey),
      isCollection: true,
      transformData: (statuses) => {
        var newStatuses = []
        const year = parseInt(eventKey.substring(0, 4), 10)
        for (var teamKey in statuses) {
          newStatuses.push(augmentTeamEventStatus(statuses[teamKey], teamKey, eventKey, year))
        }
        return newStatuses
      },
      createAction: (statuses) => {
        return {
          type: types.RECEIVE_EVENT_TEAM_STATUSES,
          eventKey,
          data: statuses,
        }
      },
      writeDB: (statuses) => {
        addTeamEventStatuses(statuses)
      },
    })
  }
}

export function fetchEventRankings(eventKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/event/${eventKey}/rankings`,
      query: db.eventRankings.where('key').equals(eventKey),
      createAction: (rankings) => {
        return {
          type: types.RECEIVE_EVENT_RANKINGS,
          eventKey,
          data: rankings,
        }
      },
      transformData: (rankings) => {
        return {key: eventKey, rankings}
      },
      writeDB: (rankings) => {
        addEventRankings(rankings)
      },
    })
  }
}

export function fetchEventAlliances(eventKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/event/${eventKey}/alliances`,
      query: db.eventAlliances.where('key').equals(eventKey),
      createAction: (alliances) => {
        return {
          type: types.RECEIVE_EVENT_ALLIANCES,
          eventKey,
          data: alliances,
        }
      },
      transformData: (alliances) => {
        return {key: eventKey, alliances}
      },
      writeDB: (alliances) => {
        addEventAlliances(alliances)
      },
    })
  }
}

// Event List Page
export function fetchYearEvents(year) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/events/${year}`,
      query: db.events.where('year').equals(year),
      isCollection: true,
      createAction: (events) => {
        return {
          type: types.RECEIVE_YEAR_EVENTS,
          year,
          data: events,
        }
      },
      writeDB: (events) => {
        addEvents(events)
      },
    })
  }
}

// Team Page
export function fetchTeamYears(teamNumber) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/team/${teamKey}/years_participated`,
      query: db.teamYears.where('key').equals(teamKey),
      transformData: (years) => {
        return {
          key: teamKey,
          years: years,
        }
      },
      createAction: (years) => {
        return {
          type: types.RECEIVE_TEAM_YEARS,
          teamKey,
          data: years,
        }
      },
      writeDB: (events) => {
        addTeamYears(events)
      },
    })
  }
}

export function fetchTeamInfo(teamNumber) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/team/${teamKey}`,
      query: db.teams.where('key').equals(teamKey),
      createAction: (team) => {
        return {
          type: types.RECEIVE_TEAM_INFO,
          teamKey,
          data: team,
        }
      },
      writeDB: (team) => {
        addTeam(team)
      },
    })
  }
}

export function fetchTeamYearAwards(teamNumber, year) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/team/${teamKey}/awards/${year}`,
      query: db.awardTeams.where('teamKey_year').equals(`${teamKey}_${year}`),
      join: (awardTeams) => {
        return Promise.all(awardTeams.map(awardTeam => db.awards.get(awardTeam.awardKey)))
      },
      isCollection: true,
      transformData: (awards) => {
        return awards.map(augmentAward)
      },
      createAction: (awards) => {
        return {
          type: types.RECEIVE_TEAM_YEAR_AWARDS,
          teamKey,
          year,
          data: awards,
        }
      },
      writeDB: (awards) => {
        addAwards(awards)
      },
    })
  }
}

export function fetchTeamYearEvents(teamNumber, year) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/team/${teamKey}/events/${year}`,
      query: db.eventTeams.where('teamKey_year').equals(`${teamKey}_${year}`),
      join: (eventTeams) => {
        return Promise.all(eventTeams.map(eventTeam => db.events.get(eventTeam.eventKey)))
      },
      isCollection: true,
      createAction: (events) => {
        return {
          type: types.RECEIVE_TEAM_YEAR_EVENTS,
          teamKey,
          year,
          data: events,
        }
      },
      writeDB: (events) => {
        addTeamEvents(teamKey, events)
      },
    })
  }
}

export function fetchTeamYearMatches(teamNumber, year) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/team/${teamKey}/matches/${year}`,
      query: db.matchTeams.where('teamKey_year').equals(`${teamKey}_${year}`),
      join: (matchTeams) => {
        return Promise.all(matchTeams.map(matchTeam => db.matches.get(matchTeam.matchKey)))
      },
      isCollection: true,
      createAction: (matches) => {
        return {
          type: types.RECEIVE_TEAM_YEAR_MATCHES,
          teamKey,
          year,
          data: matches,
        }
      },
      writeDB: (matches) => {
        addMatches(matches)
      },
    })
  }
}

export function fetchTeamYearEventStatuses(teamNumber, year) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/team/${teamKey}/events/${year}/statuses`,
      query: db.teamEventStatuses.where('teamKey_year').equals(`${teamKey}_${year}`),
      isCollection: true,
      transformData: (statuses) => {
        var newStatuses = []
        for (var eventKey in statuses) {
          newStatuses.push(augmentTeamEventStatus(statuses[eventKey], teamKey, eventKey, year))
        }
        return newStatuses
      },
      createAction: (statuses) => {
        return {
          type: types.RECEIVE_TEAM_YEAR_EVENT_STATUSES,
          teamKey,
          year,
          data: statuses,
        }
      },
      writeDB: (statuses) => {
        addTeamEventStatuses(statuses)
      },
    })
  }
}

export function fetchTeamYearMedia(teamNumber, year) {
  return (dispatch, getState) => {
    const teamKey = `frc${teamNumber}`
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/team/${teamKey}/media/${year}`,
      query: db.mediaTeams.where('teamKey_year').equals(`${teamKey}_${year}`),
      join: (mediaTeams) => {
        return Promise.all(mediaTeams.map(mediaTeam => db.media.get(mediaTeam.mediaKey)))
      },
      isCollection: true,
      transformData: (medias) => {
        var newMedias = []
        for (var media of medias) {
          newMedias.push(augmentMedia(media))
        }
        return newMedias
      },
      createAction: (medias) => {
        return {
          type: types.RECEIVE_TEAM_YEAR_MEDIA,
          teamKey,
          year,
          data: medias,
        }
      },
      writeDB: (medias) => {
        addTeamMedias(teamKey, medias, year)
      },
    })
  }
}

// Team List Page
export function fetchTeamListHelper(pageNum) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/teams/${pageNum}`,
      fastQuery: pageNum === 0 && db.teams.where('team_number').between(0, 20),
      query: db.teams.where('team_number').between(pageNum * 500, pageNum * 500 + 500),
      isCollection: true,
      createAction: (teams) => {
        return {
          type: types.RECEIVE_TEAM_LIST_PAGE,
          data: teams,
        }
      },
      writeDB: (teams) => {
        addTeams(teams)
      },
    })
  }
}

export function fetchTeamListAll() {
  return (dispatch) => {
    for (let pageNum=0; pageNum<15; pageNum++) {
      dispatch(fetchTeamListHelper(pageNum))
    }
  }
}

// Match Page
export function fetchMatchInfo(matchKey) {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/api/v3/match/${matchKey}`,
      query: db.matches.where('key').equals(matchKey),
      createAction: (match) => {
        return {
          type: types.RECEIVE_MATCH_INFO,
          matchKey,
          data: match,
        }
      },
      writeDB: (match) => {
        addMatch(match)
      },
    })
  }
}

// User
export function fetchUserFavorites() {
  return (dispatch, getState) => {
    return createFetcher({
      dispatch,
      getState,
      endpointUrl: `/_ah/api/tbaMobile/v9/favorites/list`,
      fetchOptions: {
        headers: {'Authorization': 'Bearer ' + getState().get('firebase').auth.stsTokenManager.accessToken},
        method: 'POST',
      },
      query: db.userFavorites.toCollection(),
      isCollection: true,
      transformData: (data) => {
        let favorites = data['favorites']
        if (!favorites) {
          return []
        }
        for (let favorite of favorites) {
          favorite.key = `${favorite.model_type}_${favorite.model_key}` // Add key
          favorite.model_type = parseInt(favorite.model_type, 10) // For some reason we're getting strings back
        }
        return favorites
      },
      createAction: (favorites) => {
        return {
          type: types.SET_USER_FAVORITES,
          favorites,
        }
      },
      writeDB: (favorites) => {
        addUserFavorites(favorites)
      },
    })
  }
}
