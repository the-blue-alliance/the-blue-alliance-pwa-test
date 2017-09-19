import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import database from './database'
import eventsByTeamByYear from './eventsByTeamByYear'
import infoByEvent from './infoByEvent'
import infoByTeam from './infoByTeam'
import teamsByEvent from './teamsByEvent'

const reducer = combineReducers({
  database,
  eventsByTeamByYear,
  infoByEvent,
  infoByTeam,
  teamsByEvent,
  router: routerReducer,
})

export default reducer
