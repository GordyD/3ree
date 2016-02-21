import createHistory from 'history/lib/createMemoryHistory';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';

import pulseApp from '../reducers';

export default (req, initialState) => {
  console.log('Server router!');
  const rootReducer = combineReducers({
    routing: routeReducer,
    pulseApp
  });

  const reduxRouterMiddleware = syncHistory(createHistory(req.originalUrl));
  const enhancer = compose(
    applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
  );

  return createStore(rootReducer, initialState);
};

    