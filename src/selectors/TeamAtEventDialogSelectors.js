import { createSelector } from 'reselect'
import Award from '../database/Award'
import Event from '../database/Event'
import Match from '../database/Match'
import Team from '../database/Team'

const getYear = (state, props) => {
  return parseInt(getEventKey(state, props).substring(0, 4), 10)
}

export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber, 10)
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

export const getEventKey = (state, props) => {
  return props.location.hash.substring(1)
}

const getEvent = (state, props) => {
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

const getAwardsByKey = (state, props) => {
  return state.getIn(['models', 'awards', 'byKey'])
}

const getEventAwardKeys = (state, props) => {
  return state.getIn(['models', 'awards', 'collections', 'byEvent', getEventKey(state, props)])
}

export const getEventAwards = createSelector(
  getAwardsByKey,
  getEventAwardKeys,
  (matchesByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => matchesByKey.get(key))
    }
  }
)

const getTeamYearAwardKeys = (state, props) => {
  return state.getIn(['models', 'awards', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, getYear(state, props)])
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

      return awards
    }
    return undefined
  }
)

const getEventStatusesByKey = (state, props) => {
  return state.getIn(['models', 'teamEventStatuses', 'byKey'])
}

const getTeamEventStatusKey = (state, props) => {
  return state.getIn(['models', 'teamEventStatuses', 'collections', 'byEvent', getEventKey(state, props), `${getEventKey(state, props)}_frc${getTeamNumber(state, props)}`])
}

export const getTeamEventStatus = createSelector(
  getEventStatusesByKey,
  getTeamEventStatusKey,
  (statusesByKey, key) => {
    if (key) {
      return statusesByKey.get(key)
    }
  }
)
