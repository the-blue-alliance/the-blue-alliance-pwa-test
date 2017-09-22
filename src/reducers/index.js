import { combineReducers } from 'redux-immutable'
// import { routerReducer } from 'react-router-redux';
import appBar from './appBar'
import page from './page'
// import router from './router'

const reducer = combineReducers({
  appBar,
  page,
  // router,
  // router: routerReducer,
})

export default reducer
