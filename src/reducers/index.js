import { combineReducers } from 'redux-immutable'
import { firebaseReducer } from 'react-redux-firebase'

import appState from './appState'
import models from './models'
import page from './page'
import user from './user'

const reducer = combineReducers({
  appState,
  firebase: firebaseReducer,
  models,
  page,
  user,
})

export default reducer
