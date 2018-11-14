import '@babel/polyfill'  // For IE support
import 'react-app-polyfill/ie9' // For IE 9-11 support
import 'intersection-observer'

import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { reactReduxFirebase } from 'react-redux-firebase'

import preloadState from './statePreloader'
import { loadAppState, saveAppState } from './saveLoadLocalStorage'
import { userManagerMiddleware } from './middleware'
import reducer from './reducers'

// Init Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDBlFwtAgb2i7hMCQ5vBv44UEKVsA543hs",
  authDomain: "pwa.thebluealliance.com",
  databaseURL: "https://tbatv-prod-hrd.firebaseio.com",
  projectId: "tbatv-prod-hrd",
  storageBucket: "tbatv-prod-hrd.appspot.com",
  messagingSenderId: "836511118694"
})
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, {})
)(createStore)

export const history = createBrowserHistory()
// const loggerMiddleware = createLogger({
//   // Convert Immutable to normal JS object
//   stateTransformer: state => state.toJS()
// })

// Preload state from SSR
let initialState = preloadState()

let composeEnhancers = compose
if(process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

// Merge in state in localStorage
initialState = initialState.set('appState', loadAppState())

export const store = createStoreWithFirebase(
  connectRouter(history)(reducer),
  initialState,
  composeEnhancers(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      userManagerMiddleware,
      // loggerMiddleware,
    )
  ),
)

// Save state to localStorage
store.subscribe(() => {
  saveAppState(store.getState())
})

// // Subscribe to the store to keep the url hash in sync
// let lastHash = null
// store.subscribe(() => {
//   const state = store.getState()
//   const newHash = state.getIn(['page', 'stateHistory', state.getIn(['page', 'currentKey']), 'hash'])
//   if (newHash !== undefined && newHash !== lastHash ) {
//     window.history.replaceState(window.history.state, null, `#${newHash}`)
//     lastHash = newHash
//   }
// })
