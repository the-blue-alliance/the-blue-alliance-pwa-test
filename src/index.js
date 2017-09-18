import React from 'react';
import ReactDOM from 'react-dom';
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
const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(thunk,loggerMiddleware, routerMiddleware(history)),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
