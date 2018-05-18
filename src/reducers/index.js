import { combineReducers } from 'redux-immutable'
import appState from './appState'
import models from './models'
import page from './page'

const reducer = combineReducers({
  appState,
  models,
  page,
})

export default reducer
