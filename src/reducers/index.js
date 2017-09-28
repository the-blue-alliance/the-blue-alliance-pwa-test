import { combineReducers } from 'redux-immutable'
import appNav from './appNav'
import page from './page'

const reducer = combineReducers({
  appNav,
  page,
})

export default reducer
