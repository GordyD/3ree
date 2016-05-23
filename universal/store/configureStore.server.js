import createHistory from 'history/lib/createMemoryHistory';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';

import pulseApp from '../reducers';
import DevTools from '../containers/devTools';

export default (req, initialState) => {
  const rootReducer = combineReducers({
    routing: routerReducer,
    pulseApp
  });

  let enhancer = compose(
    applyMiddleware(thunkMiddleware)
  );

  if (process.env.NODE_ENV !== 'production') {
    enhancer = compose(
      applyMiddleware(thunkMiddleware),
      DevTools.instrument()
    );
  }

  return createStore(rootReducer, initialState, enhancer);
};

    