import { combineReducers } from 'redux-immutable'
// import { routerReducer } from 'react-router-redux';
import models from './models'
// import router from './router'
// import database from './database'
// import eventsByTeamByYear from './eventsByTeamByYear'
// import infoByEvent from './infoByEvent'
// import infoByTeam from './infoByTeam'
// import teamsByEvent from './teamsByEvent'

const reducer = combineReducers({
  models,
  // router,
  // database,
  // eventsByTeamByYear,
  // infoByEvent,
  // infoByTeam,
  // teamsByEvent,
  // router: routerReducer,
})

export default reducer
