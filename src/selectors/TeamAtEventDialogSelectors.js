export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber, 10)
}

export const getTeamModel = (state, props) => {
  return state.getIn(['models', 'teams', 'byKey', `frc${getTeamNumber(state, props)}`])
}

export const getEventKey = (state, props) => {
  return props.location.hash.substring(1)
}

export const getEventModel = (state, props) => {
  return state.getIn(['models', 'events', 'byKey', getEventKey(state, props)])
}
