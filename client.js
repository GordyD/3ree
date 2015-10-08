import React from 'react';
import { getOrSetUserId } from './client/UserId';
import { setupRealtime } from './client/Realtime';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import PulseApp from './universal/containers/PulseApp';
import pulseApp from './universal/reducers';
import * as actions from './universal/actions/PulseActions';

import './style/pure.css';
import './style/main.css';
import './style/spinner.css';

// Grab the state from a global injected into server-generated HTML
let initialState = window.__INITIAL_STATE__;

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

// Create Redux store with initial state
const store = createStoreWithMiddleware(pulseApp, initialState);

React.render(
  <Provider store={store}>
    <PulseApp />
  </Provider>,
  document.getElementById('app')
);

// Now that we have rendered...
setupRealtime(store, actions);

// lets mutate state and set UserID as key from local storage
store.dispatch(actions.setUserId(getOrSetUserId()));