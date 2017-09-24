import { combineReducers } from 'redux-immutable'
// import { routerReducer } from 'react-router-redux';
import appNav from './appNav'
import page from './page'
// import router from './router'

const reducer = combineReducers({
  appNav,
  page,
  // router,
  // router: routerReducer,
})

export default reducer
