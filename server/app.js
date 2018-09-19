import { Map } from 'immutable'
import path from 'path';
import { createStore, applyMiddleware } from 'redux'
import React from 'react';
import { StaticRouter, matchPath } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import uglifycss from 'uglifycss'

import { createReactAppExpress } from '@cra-express/core';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import Helmet from 'react-helmet';

const { default: TBAApp } = require('../src/TBAApp');
import routes from '../src/routes'
import reducer from '../src/reducers'
import {receiveEventMatches} from '../src/actions';

const clientBuildPath = path.resolve(__dirname, '../client');
const app = createReactAppExpress({
  clientBuildPath,
  handleRender: renderPage,
  universalRender: handleUniversalRender,
});

let TBAAppClass = TBAApp;

let context;
let sheetsRegistry;
let preloadedState;
function renderPage(req, res, stream, htmlData, options) {
  // Reduce TTFB by streaming HTML to client as it becomes available
  // Currently not as optimal as it could be due to render blocking
  const segments1 = htmlData.split('<style id="jss-server-side">')
  const segments2 = segments1[1].split('<div id="root">')
  const lastSegment = segments2[1].replace( // Be careful of XSS
    '<script id="preloaded-state-server-side"></script>',
    `<script id="preloaded-state-server-side">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`
  )

  let string = ''
  stream.on('data', chunk => string += chunk.toString())
  stream.on('end', () => {
    console.timeEnd(`${req.url} RENDER`)

    // TODO: Determine status code early in render and this whole chunk can move up
    if (context.statusCode) {
      res.writeHead(context.statusCode, {'Cache-Control': 'public, max-age=60, s-maxage=60'})
    } else {
      res.writeHead(200, {'Cache-Control': 'public, max-age=60, s-maxage=60'})
    }
    res.write(segments1[0]) // Doesn't depend on render but needs to be after status code

    // Fill in the rest
    const helmet = Helmet.renderStatic()
    const tags = helmet.title.toString() +
      helmet.meta.toString() +
      helmet.link.toString()
    res.write(tags + '<style id="jss-server-side">' +
      uglifycss.processString(sheetsRegistry.toString()) +
      segments2[0] + '<div id="root">' + string + lastSegment
    )
    res.end()
    console.log(`${req.url} END`)
  })
}

function handleUniversalRender(req, res) {
  console.log(`${req.url} START`)

  const initialState = Map()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  )

  let foundPath = null
  // Get matching component
  let { path, component } = routes.find(
    ({ path, exact }) => {
      foundPath = matchPath(req.url,
        {
          path,
          exact,
          strict: false
        }
      )
      return foundPath
    }
  ) || {}

  // Make empty component to be safe
  if (!component) {
    component = {}
  }

  // Set fetchData if it doesn't exist to be safe
  if (!component.fetchData) {
    component.fetchData = () => new Promise(resolve => resolve())
  }

  console.time(`${req.url} FETCH`)
  return component.fetchData({ store, params: (foundPath ? foundPath.params : {}) }).then(() => {
    console.timeEnd(`${req.url} FETCH`)

    // Remove parts of state we don't care about
    preloadedState = store.getState().delete('page').delete('appState').toJS()

    context = {};
    sheetsRegistry = new SheetsRegistry();
    const generateClassName = createGenerateClassName();
    console.time(`${req.url} RENDER`)
    return ReactDOMServer.renderToNodeStream(
      <Provider store={store}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <StaticRouter location={req.url} context={context}>
            <TBAAppClass />
          </StaticRouter>
        </JssProvider>
      </Provider>
    );
  })
  .catch(err => {
    console.error(err);
    res.send(500);
  });
}

if (module.hot) {
  module.hot.accept('../src/TBAApp', () => {
    const { default: TBAApp } = require('../src/TBAApp');
    TBAAppClass = TBAApp;
    console.log('✅ Server hot reloaded TBAApp');
  });
}


module.exports = app;
