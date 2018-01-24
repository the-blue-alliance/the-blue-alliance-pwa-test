import { combineReducers } from 'redux-immutable'
import appState from './appState'
import page from './page'

const reducer = combineReducers({
  appState,
  page,
})

export default reducer
