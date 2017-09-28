export const getTeamNumber = (state, props) => {
  return parseInt(props.match.params.teamNumber)
}
