import shallowEqual from 'fbjs/lib/shallowEqual';

export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber)
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
    const teamYearEvents = state.getIn(['page', 'modelHistory', key, 'events', 'collections', 'byTeamYear', `frc${getTeamNumber(state, props)}`, 2017])
    if (teamYearEvents !== undefined) {
      return teamYearEvents
    }
  }
}
