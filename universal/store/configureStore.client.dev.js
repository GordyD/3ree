import { createHistory } from 'history';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistory, routeReducer } from 'react-router-redux';
import DevTools from '../containers/devTools';
import { persistState } from 'redux-devtools';

import pulseApp from '../reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const rootReducer = combineReducers({
  routing: routeReducer,
  pulseApp
});

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const enhancer = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware, reduxRouterMiddleware),
  DevTools.instrument()
);

const store = createStore(rootReducer, initialState, enhancer);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(combineReducers({
      routing: routeReducer,
      pulseApp: require('../reducers')
    }))
  );
};

export default store;

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);
