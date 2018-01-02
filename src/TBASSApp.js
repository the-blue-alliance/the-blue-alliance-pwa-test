import React, { Component } from 'react';
import { Map } from 'immutable';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { StaticRouter } from 'react-router-dom'
import reducer from './reducers'
import TBAApp from './TBAApp'

const initialState = Map()
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

class TBASSApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <StaticRouter
          location={this.props.url}
          context={this.props.context}
        >
          <TBAApp />
        </StaticRouter>
      </Provider>
    )
  }
}
export default TBASSApp;
