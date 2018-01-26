import { createSelector } from 'reselect'
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
  return `${props.match.params.year}${props.location.hash.substring(1)}`
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

export const getTeamYearMatches = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const teamYearMatches = state.getIn(['page', 'modelHistory', key, 'matches', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, parseInt(getEventKey(state, props).substring(0, 4), 10)])
    if (teamYearMatches !== undefined) {
      return teamYearMatches
    }
  }
}

export const getSortedMatches = createSelector(
  [getTeamNumber, getEventKey, getEventMatches, getTeamYearMatches],
  (teamNumber, eventKey, eventMatches, teamMatches) => {
    let matches = eventMatches
    if (!eventMatches) {
      matches = teamMatches
    }

    if (matches) {
      matches = matches.map(m => new Match(m)).filter(m => {
        return (m.alliances.getIn(['red', 'team_keys']).concat(m.alliances.getIn(['blue', 'team_keys'])).toSet().has(`frc${teamNumber}`) &&
          m.event_key === eventKey)
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
