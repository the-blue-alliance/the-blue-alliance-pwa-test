import { createSelector } from 'reselect'
import { List } from 'immutable'
import Match from '../database/Match'


export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber, 10)
}

export const getTeam = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const team = state.getIn(['page', 'modelHistory', key, 'teams', 'byKey', `frc${getTeamNumber(state, props)}`])
    if (team !== undefined) {
      return team
    }
  }
}

export const getEventKey = (state, props) => {
  return props.location.hash.substring(1)
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

export const getSortedMatches = createSelector(
  [getTeamNumber, getEventMatches],
  (teamNumber, matches) => {
    if (matches) {
      matches = matches.map(m => new Match(m)).filter(m => {
        return m.alliances.getIn(['red', 'team_keys']).concat(m.alliances.getIn(['blue', 'team_keys'])).toSet().has(`frc${teamNumber}`)
      })
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
