import { createSelector } from 'reselect'
import Event from '../database/Event'
import Match from '../database/Match'
import Team from '../database/Team'

export const getEventKey = (state, props) => {
  return props.match.params.eventKey
}

export const getEvent = (state, props) => {
  return state.getIn(['models', 'events', 'byKey', getEventKey(state, props)])
}

export const getEventModel = createSelector(
  [getEvent],
  (event) => {
    if (event) {
      return new Event(event)
    }
    return undefined
  }
)

const getMatchesByKey = (state, props) => {
  return state.getIn(['models', 'matches', 'byKey'])
}

const getEventMatchKeys = (state, props) => {
  return state.getIn(['models', 'matches', 'collections', 'byEvent', getEventKey(state, props)])
}

const getEventMatches = createSelector(
  getMatchesByKey,
  getEventMatchKeys,
  (matchesByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => matchesByKey.get(key))
    }
  }
)

export const getSortedEventMatches = createSelector(
  [getEventMatches],
  (matches) => {
    if (matches) {
      matches = matches.map(m => new Match(m))
      return matches.toList().sort((a, b) => {
        const orderA = a.getNaturalOrder()
        const orderB = b.getNaturalOrder()
        if (orderA < orderB) {
          return -1
        }
        if (orderA > orderB) {
          return 1
        }
        return 0
      }).toList()
    }
    return undefined
  }
)

export const getSortedEventQualMatches = createSelector(
  [getEventMatches],
  (matches) => {
    if (matches) {
      matches = matches.filter(m => m.get('comp_level') === 'qm').map(m => new Match(m))
      return matches.toList().sort((a, b) => {
        const orderA = a.getNaturalOrder()
        const orderB = b.getNaturalOrder()
        if (orderA < orderB) {
          return -1
        }
        if (orderA > orderB) {
          return 1
        }
        return 0
      }).toList()
    }
    return undefined
  }
)

export const getSortedEventPlayoffMatches = createSelector(
  [getEventMatches],
  (matches) => {
    if (matches) {
      matches = matches.filter(m => m.get('comp_level') !== 'qm').map(m => new Match(m))
      return matches.toList().sort((a, b) => {
        const orderA = a.getNaturalOrder()
        const orderB = b.getNaturalOrder()
        if (orderA < orderB) {
          return -1
        }
        if (orderA > orderB) {
          return 1
        }
        return 0
      }).toList()
    }
    return undefined
  }
)

const getTeamsByKey = (state, props) => {
  return state.getIn(['models', 'teams', 'byKey'])
}
const getEventTeamKeys = (state, props) => {
  return state.getIn(['models', 'teams', 'collections', 'byEvent', getEventKey(state, props)])
}

const getEventTeams = createSelector(
  getTeamsByKey,
  getEventTeamKeys,
  (teamsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => teamsByKey.get(key))
    }
  }
)

export const getSortedEventTeams = createSelector(
  [getEventTeams],
  (teams) => {
    if (teams) {
      teams = teams.map(m => new Team(m))
      return teams.sort((a, b) => {
        if (a.get('team_number') < b.get('team_number')) {
          return -1
        }
        if (a.get('team_number') > b.get('team_number')) {
          return 1
        }
        return 0
      }).toList()
    }
    return undefined
  }
)
