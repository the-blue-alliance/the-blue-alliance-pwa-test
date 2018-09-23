import { createSelector } from 'reselect'
import { getYear } from '../selectors/CommonPageSelectors'

export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber, 10)
}

const getTeamKey = (state, props) => {
  return `frc${getTeamNumber(state, props)}`
}

export const getTeamYears = (state, props) => {
  return state.getIn(['models', 'teamYears', 'byKey', getTeamKey(state, props), 'years'])
}

export const getTeamModel = (state, props) => {
  return state.getIn(['models', 'teams', 'byKey', getTeamKey(state, props)])
}

const getTeamYearEventKeys = (state, props) => {
  return state.getIn(['models', 'events', 'collections', 'byTeamYear', getTeamKey(state, props), getYear(state, props)])
}

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
  }
)

const getMediaByKey = (state, props) => {
  return state.getIn(['models', 'media', 'byKey'])
}

const getTeamYearMediaKeys = (state, props) => {
  return state.getIn(['models', 'media', 'collections', 'byTeamYear', getTeamKey(state, props), getYear(state, props)])
}

export const getTeamYearMedias = createSelector(
  getMediaByKey,
  getTeamYearMediaKeys,
  (mediaByKey, keys) => {
    if (keys) {
      return keys.toSeq().map(key => mediaByKey.get(key))
    }
  }
)
