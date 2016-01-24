import React from 'react';
import ReactDOMServer from 'react-dom/server';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import * as eventService from './api/service/event';

import pulseApp from '../universal/reducers';
import routes from '../universal/routes';

import { routerStateReducer, ReduxRouter } from 'redux-router';
import { reduxReactRouter, match } from 'redux-router/server';

import createHistory from 'history/lib/createMemoryHistory';


export function handleRender(req, res) {
  eventService.getEvents()
  .then(initialEvents => {

    var initialState = {pulseApp: { events: initialEvents, userId: 'baseUser'} };

    const reducers = combineReducers({
      router: routerStateReducer,
      pulseApp
    });

    // Create a new Redux store instance
    const store = compose(
      applyMiddleware(thunkMiddleware),
      reduxReactRouter({routes, createHistory})
    )(createStore)(reducers, initialState);

    // Wire up routing based upon routes
    store.dispatch(match(req.url, (error, redirectLocation, renderProps) => {
      if (error)  {
        console.log('Error', error);
        res.status(400);
        res.send(error);
        return;
      }

      if (redirectLocation) {
        res.redirect(redirectLocation);
        return;
      }



      // Render the component to a string
      const html = ReactDOMServer.renderToString(
        <div>
          <Provider store={store}>
            <ReduxRouter {...renderProps} />
          </Provider>
        </div>
      );

      // Send the rendered page back to the client with the initial state
      res.render('index', { html: html, initialState: JSON.stringify(store.getState()) });
    }));
  });
}