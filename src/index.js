import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import amber from 'material-ui/colors/amber';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import reducer from './reducers'

import TBAApp from './TBAApp'


const history = createBrowserHistory()
const loggerMiddleware = createLogger({
  // Convert Immutable to normal JS object
  stateTransformer: state => state.toJS()
})
const initialState = Map()
const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  applyMiddleware(thunk, routerMiddleware(history)),
);

// Subscribe to the store to keep the url hash in sync
let lastHash = null
store.subscribe(() => {
  const state = store.getState()
  const newHash = state.getIn(['page', 'stateHistory', state.getIn(['page', 'currentKey']), 'hash'])
  if (newHash !== undefined && newHash !== lastHash ) {
    window.history.replaceState(null, null, `#${newHash}`)
    lastHash = newHash
  }
})

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <TBAApp />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
