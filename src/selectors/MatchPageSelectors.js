export const getEventKey = (state, props) => {
  return props.match.params.matchKey.split('_')[0]
}

export const getEvent = (state, props) => {
  return state.getIn(['models', 'events', 'byKey', getEventKey(state, props)])
}

export const getMatchKey = (state, props) => {
  return props.match.params.matchKey
}

export const getMatch = (state, props) => {
  return state.getIn(['models', 'matches', 'byKey', getMatchKey(state, props)])
}
