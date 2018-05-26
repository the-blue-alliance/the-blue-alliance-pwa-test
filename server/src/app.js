import { Map } from 'immutable'
import path from 'path';
import { createStore, applyMiddleware } from 'redux'
import React from 'react';
import { StaticRouter } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import uglifycss from 'uglifycss'

import { createReactAppExpress } from '@cra-express/core';
import { getInitialData } from '@cra-express/redux-prefetcher'
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import Helmet from 'react-helmet';

import TBAApp from '../../src/TBAApp'
import reducer from '../../src/reducers'
import {receiveEventMatches} from '../../src/actions';

const clientBuildPath = path.resolve(__dirname, 'client');
const app = createReactAppExpress({
  clientBuildPath,
  handleRender: renderPage,
  universalRender: handleUniversalRender,
});

let preloadedState;
let css;
function renderPage(req, res, str, htmlData, options) {
  const helmet = Helmet.renderStatic();
  const tags = helmet.title.toString() +
      helmet.meta.toString() +
      helmet.link.toString()
  res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
  res.send(
    htmlData.replace(
      '<style id="jss-server-side"></style>',
      `<style id="jss-server-side">${css}</style>${tags}`
    ).replace( // Be careful of XSS
      '<script id="preloaded-state-server-side"></script>',
      `<script id="preloaded-state-server-side">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`
    ).replace(
      '<div id="root"></div>',
      `<div id="root">${str}</div>`
    )
  )
}

function handleUniversalRender(req, res) {
  const initialState = Map()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  )
  const expressCtx = { req, res };
  return getInitialData(expressCtx, store, []).then(() => {  // TODO

  // console.time(`${req.url} FETCH`)
  // return fetch('https://www.thebluealliance.com/api/v3/event/2017casj/matches',
  //   {headers: {'X-TBA-Auth-Key': '61bdelekzYp5TY5MueT8OokJsgT1ewwLjywZnTKCAYPCLDeoNnURu1O61DeNy8z3'}
  // }).then(response => response.json()).then(data => {
  //   store.dispatch(receiveEventMatches('2017casj', data))

    // console.timeEnd(`${req.url} FETCH`)
    const context = {};
    const sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();
    console.time(`${req.url} RENDER`)
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <TBAApp />
          </JssProvider>
        </StaticRouter>
      </Provider>
    );
    console.timeEnd(`${req.url} RENDER`)

    // Set status code
    if (context.statusCode) {
      res.status(context.statusCode)
    }

    // Remove parts of state we don't care about
    preloadedState = store.getState().delete('page').delete('appState').toJS()
    css = uglifycss.processString(sheetsRegistry.toString())
    return html
  })
  .catch(err => {
    console.error(err);
    res.send(500);
  });
}

module.exports = app;
