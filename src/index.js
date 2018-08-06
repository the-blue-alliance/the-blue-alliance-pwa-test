import 'babel-polyfill'
import 'intersection-observer'

import React from 'react'
import ReactDOM from 'react-dom'
import { fromJS, Map } from 'immutable'
import registerServiceWorker from './registerServiceWorker'

import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { reactReduxFirebase } from 'react-redux-firebase'

import { userManagerMiddleware } from './middleware'
import reducer from './reducers'
import TBAApp from './TBAApp'

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

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

const history = createBrowserHistory()
// const loggerMiddleware = createLogger({
//   // Convert Immutable to normal JS object
//   stateTransformer: state => state.toJS()
// })

// Grab the state from a global variable injected into the server-generated HTML
// https://redux.js.org/recipes/server-rendering#the-client-side
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__  // Allow garbage collection
let initialState = Map()
if (preloadedState) {
  initialState = fromJS(preloadedState)
  // Remove the script tag
  const preload = document.getElementById('preloaded-state-server-side')
  if (preload && preload.parentNode) {
    preload.parentNode.removeChild(preload)
  }
}
const store = createStoreWithFirebase(
  connectRouter(history)(reducer),
  initialState,
  applyMiddleware(
    thunk,
    routerMiddleware(history),
    userManagerMiddleware,
    // loggerMiddleware,
  ),
)

// Subscribe to the store to keep the url hash in sync
let lastHash = null
store.subscribe(() => {
  const state = store.getState()
  const newHash = state.getIn(['page', 'stateHistory', state.getIn(['page', 'currentKey']), 'hash'])
  if (newHash !== undefined && newHash !== lastHash ) {
    window.history.replaceState(window.history.state, null, `#${newHash}`)
    lastHash = newHash
  }
})

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <TBAApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))

registerServiceWorker(store)
