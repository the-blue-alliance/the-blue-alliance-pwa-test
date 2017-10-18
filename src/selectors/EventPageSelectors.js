import { createSelector } from 'reselect'
import { List } from 'immutable'
import Match from '../database/Match'

export const getEventKey = (state, props) => {
  return props.match.params.eventKey
}


export const getEvent = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const event = state.getIn(['page', 'modelHistory', key, 'events', 'byKey', getEventKey(state, props)])
    if (event !== undefined) {
      return event
    }
  }
}

const getEventMatches = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const matches = state.getIn(['page', 'modelHistory', key, 'matches', 'collections', 'byEvent', getEventKey(state, props)])
    if (matches !== undefined) {
      return matches
    }
  }
}

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

const getEventTeams = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const teams = state.getIn(['page', 'modelHistory', key, 'teams', 'collections', 'byEvent', getEventKey(state, props)])
    if (teams !== undefined) {
      return teams
    }
  }
}

export const getSortedEventTeams = createSelector(
  [getEventTeams],
  (teams) => {
    if (teams) {
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
    return List()
  }
)
