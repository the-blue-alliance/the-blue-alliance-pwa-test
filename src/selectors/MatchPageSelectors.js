import Match from '../database/Match'

export const getEventKey = (state, props) => {
  return props.match.params.matchKey.split('_')[0]
}

export const getEvent = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const event = state.getIn(['page', 'modelHistory', key, 'events', 'byKey', getEventKey(state, props)])
    if (event !== undefined) {
      return event
    }
  }
}

export const getMatchKey = (state, props) => {
  return props.match.params.matchKey
}

export const getMatch = (state, props) => {
  for (let key of state.getIn(['page', 'historyOrder']).reverse().toList()) {
    const match = state.getIn(['page', 'modelHistory', key, 'matches', 'byKey', getMatchKey(state, props)])
    if (match !== undefined) {
      return new Match(match)
    }
  }
}
