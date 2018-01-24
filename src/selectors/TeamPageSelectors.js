import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { getYear } from '../selectors/CommonPageSelectors'
import Event from '../database/Event'
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

export const getTeamYearEvents = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const teamYearEvents = state.getIn(['page', 'modelHistory', key, 'events', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, getYear(state, props)])
    if (teamYearEvents !== undefined) {
      return teamYearEvents
    }
  }
}

export const getSortedTeamYearEvents = createSelector(
  [getTeamYearEvents],
  (events) => {
    if (events) {
      events = events.map(e => new Event(e))
      return events.sort((a, b) => {
        if (a.get('start_date') < b.get('start_date')) {
          return -1
        }
        if (a.get('start_date') > b.get('start_date')) {
          return 1
        }
        return 0
      }).toList()
    }
    return List()
  }
)

export const getTeamYearMatches = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const teamYearMatches = state.getIn(['page', 'modelHistory', key, 'matches', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, getYear(state, props)])
    if (teamYearMatches !== undefined) {
      return teamYearMatches
    }
  }
}

export const getMatchesByEvent = createSelector(
  [getTeamYearMatches],
  (matches) => {
    let matchesByEvent = Map()
    if (matches) {
      // Group by event
      matches.map(m => new Match(m)).forEach(m => {
        let oldList = matchesByEvent.get(m.event_key)
        if (oldList ===  undefined) {
          oldList = List()
        }
        matchesByEvent = matchesByEvent.set(m.event_key, oldList.push(m))
      })
    }

    // Sort each event's matches
    for (let eventKey of matchesByEvent.keys()) {
      matchesByEvent = matchesByEvent.set(
        eventKey,
        matchesByEvent.get(eventKey).sort((a, b) => {
          if (a.getPlayOrder() < b.getPlayOrder()) {
            return -1
          }
          if (a.getPlayOrder() > b.getPlayOrder()) {
            return 1
          }
          return 0
        })
      )
    }
    return matchesByEvent
  }
)
