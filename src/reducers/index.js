import { combineReducers } from 'redux-immutable'
// import { routerReducer } from 'react-router-redux';
import appBar from './appBar'
import models from './models'
// import router from './router'

const reducer = combineReducers({
  appBar,
  models,
  // router,
  // router: routerReducer,
})

export default reducer
