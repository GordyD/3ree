import ReactDOM from 'react-dom';
import React from 'react';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import { Route } from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';

import { getOrSetUserId } from './UserId';
import { setupRealtime } from './Realtime';

import routes from '../universal/routes'
import pulseApp from '../universal/reducers';
import * as actions from '../universal/actions/PulseActions';

import '../style/pure.css';
import '../style/main.css';
import '../style/spinner.css';

// Grab the state from a global injected into server-generated HTML
let initialState = window.__INITIAL_STATE__;

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const reducers = combineReducers({
  router: routerStateReducer,
  pulseApp
});

const store = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  reduxReactRouter({createHistory}),
  devTools()
)(createStore)(reducers, initialState);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <ReduxRouter>
        {routes}
      </ReduxRouter>
    </Provider>
  </div>,
  document.getElementById('app')
);

// Now that we have rendered...
setupRealtime(store, actions);

// lets mutate state and set UserID as key from local storage
store.dispatch(actions.setUserId(getOrSetUserId()));