import { createSelector } from 'reselect'
import { List, Map } from 'immutable'
import { getYear } from '../selectors/CommonPageSelectors'
import Award from '../database/Award'
import Event from '../database/Event'
import Match from '../database/Match'
import Team from '../database/Team'

export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber, 10)
}

export const getTeamYears = (state, props) => {
  return state.getIn(['models', 'teamYears', 'byKey', `frc${getTeamNumber(state, props)}`, 'years'])
}

export const getTeam = (state, props) => {
  return state.getIn(['models', 'teams', 'byKey', `frc${getTeamNumber(state, props)}`])
}

export const getTeamModel = createSelector(
  [getTeam],
  (team) => {
    if (team) {
      return new Team(team)
    }
    return undefined
  }
)

const getAwardsByKey = (state, props) => {
  return state.getIn(['models', 'awards', 'byKey'])
}

const getTeamYearAwardKeys = (state, props) => {
  return state.getIn(['models', 'awards', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, getYear(state, props)])
}

const getTeamYearEventKeys = (state, props) => {
  return state.getIn(['models', 'events', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, getYear(state, props)])
}

const getTeamYearAwards = createSelector(
  getAwardsByKey,
  getTeamYearAwardKeys,
  (awardsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => awardsByKey.get(key))
    }
  }
)

export const getAwardsByEvent = createSelector(
  [getTeamYearAwards, getTeamYearEventKeys],
  (awards, eventKeys) => {
    let awardsByEvent = Map()
    if (awards && eventKeys) {
      // Fill with events
      eventKeys.toSeq().forEach(eventKey =>
        awardsByEvent = awardsByEvent.set(eventKey, List())
      )

      // Group by event
      awards.map(a => new Award(a)).forEach(a => {
        let oldList = awardsByEvent.get(a.event_key)
        if (oldList) {
          awardsByEvent = awardsByEvent.set(a.event_key, oldList.push(a))
        }
      })
    }

    // Sort each event's awards
    // TODO: actually sort
    for (let eventKey of awardsByEvent.keys()) {
      awardsByEvent = awardsByEvent.set(
        eventKey,
        awardsByEvent.get(eventKey).sort((a, b) => {
          if (a.award_type < b.award_type) {
            return -1
          }
          if (a.award_type > b.award_type) {
            return 1
          }
          return 0
        })
      )
    }
    return awardsByEvent
  }
)

const getEventsByKey = (state, props) => {
  return state.getIn(['models', 'events', 'byKey'])
}

const getTeamYearEvents = createSelector(
  getEventsByKey,
  getTeamYearEventKeys,
  (eventsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => eventsByKey.get(key))
    }
  }
)

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

const getMatchesByKey = (state, props) => {
  return state.getIn(['models', 'matches', 'byKey'])
}

const getTeamYearMatchKeys = (state, props) => {
  return state.getIn(['models', 'matches', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, getYear(state, props)])
}

const getTeamYearMatches = createSelector(
  getMatchesByKey,
  getTeamYearMatchKeys,
  (matchesByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => matchesByKey.get(key))
    }
  }
)

export const getMatchesByEvent = createSelector(
  [getTeamYearMatches, getTeamYearEventKeys],
  (matches, eventKeys) => {
    let matchesByEvent = Map()
    if (matches && eventKeys) {
      // Fill with events
      eventKeys.toSeq().forEach(eventKey =>
        matchesByEvent = matchesByEvent.set(eventKey, List())
      )

      // Group by event
      matches.map(m => new Match(m)).forEach(m => {
        let oldList = matchesByEvent.get(m.event_key)
        if (oldList) {
          matchesByEvent = matchesByEvent.set(m.event_key, oldList.push(m))
        }
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

const getEventStatusesByKey = (state, props) => {
  return state.getIn(['models', 'teamEventStatuses', 'byKey'])
}

const getTeamYearEventStatusKeys = (state, props) => {
  return state.getIn(['models', 'teamEventStatuses', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, getYear(state, props)])
}

export const getStatusByEvent = createSelector(
  getEventStatusesByKey,
  getTeamYearEventStatusKeys,
  (statusesByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => statusesByKey.get(key))
    }
  }
)
