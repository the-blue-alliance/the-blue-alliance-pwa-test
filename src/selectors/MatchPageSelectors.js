import { createSelector } from 'reselect'
import Match from '../database/Match'
import Event from '../database/Event'

const getEventsByKey = (state, props) => {
  return state.getIn(['models', 'events', 'byKey'])
}

export const getEventKey = (state, props) => {
  return props.match.params.matchKey.split('_')[0]
}

export const getEvent = createSelector(
  getEventsByKey,
  getEventKey,
  (eventsByKey, key) => {
    if (eventsByKey && key) {
      return new Event(eventsByKey.get(key))
    }
  }
)

const getMatchesByKey = (state, props) => {
  return state.getIn(['models', 'matches', 'byKey'])
}

export const getMatchKey = (state, props) => {
  return props.match.params.matchKey
}

export const getMatch = createSelector(
  getMatchesByKey,
  getMatchKey,
  (matchesByKey, key) => {
    if (matchesByKey && key) {
      return new Match(matchesByKey.get(key))
    }
  }
)
