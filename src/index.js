import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import reducer from './reducers'

import App from './App.js'


const history = createHistory();
// const loggerMiddleware = createLogger({
//   // Convert Immutable to normal JS object
//   stateTransformer: state => state.toJS()
// })
const initialState = Map()
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, routerMiddleware(history)),
);

const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
