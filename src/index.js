import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { fromJS, Map } from 'immutable'
import registerServiceWorker from './registerServiceWorker'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import reducer from './reducers'

import TBAApp from './TBAApp'

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const history = createBrowserHistory()
// const loggerMiddleware = createLogger({
//   // Convert Immutable to normal JS object
//   stateTransformer: state => state.toJS()
// })

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
let initialState = Map()
if (preloadedState) {
  initialState = fromJS(preloadedState)
}
const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  applyMiddleware(thunk, routerMiddleware(history)),
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
