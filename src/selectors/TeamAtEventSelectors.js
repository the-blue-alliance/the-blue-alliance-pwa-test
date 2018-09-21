import createCachedSelector from 're-reselect'
import Award from '../database/Award'
import Match from '../database/Match'

const getTeamKey = (state, props) => {
  return props.teamKey
}

const getEventKey = (state, props) => {
  return props.eventKey
}

const getTeamEventKey = (state, props) => {
  return `${getEventKey(state, props)}_${getTeamKey(state, props)}`
}

const getYear = (state, props) => {
  return parseInt(getEventKey(state, props).substring(0, 4), 10)
}

const getTeamYearKey = (state, props) => {
  return `${getTeamKey(state, props)}_${getYear(state, props)}`
}

// Awards
const getAwardsByKey = (state, props) => {
  return state.getIn(['models', 'awards', 'byKey'])
}

const getEventAwardKeys = (state, props) => {
  return state.getIn(['models', 'awards', 'collections', 'byEvent', getEventKey(state, props)])
}

const getEventAwards = createCachedSelector(
  getAwardsByKey,
  getEventAwardKeys,
  (awardsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => new Award(awardsByKey.get(key)))
    }
  }
)(
  (state, props) => getEventKey(state, props)
)

const getTeamYearAwardKeys = (state, props) => {
  return state.getIn(['models', 'awards', 'collections', 'byTeamYear', props.teamKey, getYear(state, props)])
}

const getTeamYearAwards = createCachedSelector(
  getAwardsByKey,
  getTeamYearAwardKeys,
  (awardsByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => new Award(awardsByKey.get(key)))
    }
  }
)(
  (state, props) => getTeamYearKey(state, props)
)

export const getTeamEventAwards = createCachedSelector(
  [getTeamKey, getEventKey, getEventAwards, getTeamYearAwards],
  (teamKey, eventKey, eventAwards, teamYearAwards) => {
    let awards = eventAwards
    if (!eventAwards) {
      awards = teamYearAwards
    }

    if (awards) {
      awards = awards.filter(a => {
        return (a.recipient_list.map(r => r.get('team_key')).toSet().has(teamKey) &&
          a.event_key === eventKey)
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
)(
  (state, props) => getTeamEventKey(state, props)
)

// Statuses
const getTeamEventStatuses = (state, props) => {
  return state.getIn(['models', 'teamEventStatuses', 'byKey'])
}

export const getTeamEventStatus = createCachedSelector(
  getTeamEventStatuses,
  getTeamEventKey,
  (statuses, teamEventKey) => {
    if (statuses) {
      return statuses.get(teamEventKey)
    }
  }
)(
  (state, props) => getTeamEventKey(state, props)
)

// Matches
const getMatchesByKey = (state, props) => {
  return state.getIn(['models', 'matches', 'byKey'])
}

const getEventMatchKeys = (state, props) => {
  return state.getIn(['models', 'matches', 'collections', 'byEvent', getEventKey(state, props)])
}

const getEventMatches = createCachedSelector(
  getMatchesByKey,
  getEventMatchKeys,
  (matchesByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => new Match(matchesByKey.get(key)))
    }
  }
)(
  (state, props) => props.eventKey
)

const getTeamYearMatchKeys = (state, props) => {
  return state.getIn(['models', 'matches', 'collections', 'byTeamYear', getTeamKey(state, props), getYear(state, props)])
}

const getTeamYearMatches = createCachedSelector(
  getMatchesByKey,
  getTeamYearMatchKeys,
  (matchesByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => new Match(matchesByKey.get(key)))
    }
  }
)(
  (state, props) => getTeamYearKey(state, props)
)

export const getTeamEventMatches = createCachedSelector(
  [getTeamKey, getEventKey, getEventMatches, getTeamYearMatches],
  (teamKey, eventKey, eventMatches, teamYearMatches) => {
    let matches = eventMatches
    if (!eventMatches) {
      matches = teamYearMatches
    }

    if (matches) {
      matches = matches.filter(m => {
        return (m.alliances.getIn(['red', 'team_keys']).concat(m.alliances.getIn(['blue', 'team_keys'])).toSet().has(teamKey) &&
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
)(
  (state, props) => getTeamEventKey(state, props)
)
