import { createSelector } from 'reselect'
import Award from '../database/Award'
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

const getTeamYearMatches = (state, props) => {
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

const getEventAwards = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const awards = state.getIn(['page', 'modelHistory', key, 'awards', 'collections', 'byEvent', getEventKey(state, props)])
    if (awards !== undefined) {
      return awards
    }
  }
}

const getTeamYearAwards = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const teamYearAwards = state.getIn(['page', 'modelHistory', key, 'awards', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, parseInt(getEventKey(state, props).substring(0, 4), 10)])
    if (teamYearAwards !== undefined) {
      return teamYearAwards
    }
  }
}

export const getSortedAwards = createSelector(
  [getTeamNumber, getEventKey, getEventAwards, getTeamYearAwards],
  (teamNumber, eventKey, eventAwards, teamAwards) => {
    let awards = eventAwards
    if (!eventAwards) {
      awards = teamAwards
    }

    if (awards) {
      awards = awards.map(a => new Award(a)).filter(a => {
        return a.get('recipient_list').map(r => r.get('team_key')).toSet().has(`frc${teamNumber}`)
      })

      // TODO: actually sort
      awards = awards.toList().sort((a, b) => {
        if (a.award_type < b.award_type) {
          return -1
        }
        if (a.award_type > b.award_type) {
          return 1
        }
        return 0
      })

      if (awards.size > 0) {
        return awards
      }
    }
    return undefined
  }
)

export const getTeamEventStatus = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const status = state.getIn(['page', 'modelHistory', key, 'teamEventStatuses', 'byEvent', getEventKey(state, props), `${getEventKey(state, props)}_frc${getTeamNumber(state, props)}`])
    if (status !== undefined) {
      return status
    }
  }
}
