import createHistory from 'history/lib/createMemoryHistory';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistory, routeReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';

import pulseApp from '../reducers';
import DevTools from '../containers/devTools';

export default (req, initialState) => {
  console.log('Server router!');
  const rootReducer = combineReducers({
    routing: routeReducer,
    pulseApp
  });

  const reduxRouterMiddleware = syncHistory(createHistory());

  let enhancer = compose(
    applyMiddleware(thunkMiddleware, reduxRouterMiddleware)
  );

  if (process.env.NODE_ENV !== 'production') {
    enhancer = compose(
      applyMiddleware(thunkMiddleware, reduxRouterMiddleware),
      DevTools.instrument()
    );
  }

  return createStore(rootReducer, initialState, enhancer);
};


