import React from 'react';
import {getOrSetUserId} from './client/UserId';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import PulseApp from './universal/containers/PulseApp';
import pulseApp from './universal/reducers';
import * as PulseActions from './universal/actions/PulseActions';
import socketClient from 'socket.io-client';
import './style/pure.css';
import './style/main.css';
import './style/spinner.css';

// Grab the state from a global injected into server-generated HTML
let initialState = window.__INITIAL_STATE__;
initialState.userId = getOrSetUserId();

console.log('Initial State', initialState);

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

const io = socketClient();

io.on('event-change', (change) => {
  if (!change.old_val) {
    if (change.new_val.userId !== initialState.userId) {
      store.dispatch(PulseActions.addEventSuccess(change.new_val));
    }
  }
  // } else if (!change.new_val) {
  //   store.dispatch(PulseActions.deleteEventSuccess(change.old_val));
  // } else {
  //   store.dispatch(PulseActions.editEventSuccess(change.new_val));
  // }
});

React.render(
  <Provider store={store}>
    {() => <PulseApp />}
  </Provider>,
  document.getElementById('app')
);