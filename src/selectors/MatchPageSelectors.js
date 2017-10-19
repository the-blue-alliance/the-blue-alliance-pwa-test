import Match from '../database/Match'

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
