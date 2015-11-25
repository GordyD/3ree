import React from 'react';
import ReactDOMServer from 'react-dom/server';
import thunkMiddleware from 'redux-thunk';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import * as eventService from './api/service/event';

import pulseApp from '../universal/reducers';
import routes from '../universal/routes'
import PulseAppContainer from '../universal/containers/PulseAppContainer';

import { Route } from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';

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
    
    // Render the component to a string
    const html = ReactDOMServer.renderToString(
      <div>
        <Provider store={store}>
          <ReduxRouter />
        </Provider>
      </div>
    );

    // Send the rendered page back to the client
    res.render('index', { html: html, initialState: JSON.stringify(store.getState()) });
  });
}