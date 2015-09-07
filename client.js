import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { Provider } from 'react-redux';
import PulseApp from './containers/PulseApp';
import pulseApp from './reducers';
import './style/pure.css';
import './style/main.css';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

console.log('Initial State', initialState);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

// Create Redux store with initial state
const store = createStoreWithMiddleware(pulseApp, initialState);

React.render(
  <Provider store={store}>
    {() => <PulseApp />}
  </Provider>,
  document.getElementById('app')
);