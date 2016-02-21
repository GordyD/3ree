import { createHistory } from 'history';
import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';

import pulseApp from '../reducers';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const rootReducer = combineReducers({
  routing: routeReducer,
  pulseApp
});

const reduxRouterMiddleware = syncHistory(browserHistory);
const enhancer = compose(
  applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;