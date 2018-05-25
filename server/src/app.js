const path = require('path');
const React = require('react');
const { Provider } = require('react-redux');
const { StaticRouter } = require('react-router');
const ReactDOMServer = require('react-dom/server');
import { Map } from 'immutable'
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { createGenerateClassName } from '@material-ui/core/styles';
import Helmet from 'react-helmet';

const { createStore, applyMiddleware } = require('redux');

import thunk from 'redux-thunk'
import { createReactAppExpress } from '@cra-express/core';
import { getInitialData } from '@cra-express/redux-prefetcher'
import stringRenderer from '@cra-express/universal-loader/lib/renderer/string-renderer';

const {default: TBAApp} = require('../../src/TBAApp');
const {default: reducer} = require('../../src/reducers');
const clientBuildPath = path.resolve(__dirname, 'client');

const sheetsRegistry = new SheetsRegistry();
const generateClassName = createGenerateClassName();
let preloadedState;
const app = createReactAppExpress({
  clientBuildPath,
  handleRender: stringRenderer,
  universalRender: handleUniversalRender,
  onFinish(req, res, html) {
    const helmet = Helmet.renderStatic();
    const css = sheetsRegistry.toString()
    const tags = helmet.title.toString() +
        helmet.meta.toString() +
        helmet.link.toString()
    // res.set('Cache-Control', 'public, max-age=60, s-maxage=120');
    res.send(html.replace(
      '</head>', `<style id="jss-server-side">${css}</style>${tags}</head>
      <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`)
    );
  },
});

function handleUniversalRender(req, res) {
  const context = {};
  const initialState = Map()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  )
  const expressCtx = { req, res };
  return getInitialData(expressCtx, store, [])  // TODO
    .then(result => {
      const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
              <TBAApp />
            </JssProvider>
          </StaticRouter>
        </Provider>
      );
      // return getLoadableState(app).then(loadableState => {
      //   tag = loadableState.getScriptTag();
      //   return ReactDOMServer.renderToNodeStream(app);
      // });
      console.time(req.url)
      const html = ReactDOMServer.renderToString(app);
      console.timeEnd(req.url)
      // Remove parts of state we don't care about
      preloadedState = store.getState().delete('page').delete('appState').toJS()
      console.log(preloadedState)
      return html
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
}

module.exports = app;
