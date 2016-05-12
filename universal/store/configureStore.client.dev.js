import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerReducer } from 'react-router-redux';
import DevTools from '../containers/devTools';

import pulseApp from '../reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const rootReducer = combineReducers({
  routing: routerReducer,
  pulseApp
});


const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const enhancer = compose(
  applyMiddleware(thunkMiddleware, loggerMiddleware),
  DevTools.instrument()
);

const store = createStore(rootReducer, initialState, enhancer);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(combineReducers({
      routing: routerReducer,
      pulseApp: require('../reducers')
    }))
  );
};

export default store;
