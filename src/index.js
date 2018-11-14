import '@babel/polyfill'  // For IE support
import 'react-app-polyfill/ie9' // For IE 9-11 support
import 'intersection-observer'

import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import registerServiceWorker from './registerServiceWorker'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { firebaseConnect } from 'react-redux-firebase'

import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName } from '@material-ui/core/styles'

import { store, history } from './store';
import TBAApp from './TBAApp'

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const generateClassName = createGenerateClassName()

// Global Firebase listeners
const TBAAppWithFirebase =  firebaseConnect((props) => [
  { path: 'live_events' },
])(TBAApp)

Loadable.preloadReady().then(() => ReactDOM.hydrate(
  <Provider store={store}>
    <JssProvider generateClassName={generateClassName}>
      <ConnectedRouter history={history}>
        <TBAAppWithFirebase />
      </ConnectedRouter>
    </JssProvider>
  </Provider>,
  document.getElementById('root'))
)

registerServiceWorker(store)
