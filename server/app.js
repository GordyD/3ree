import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';

import * as eventService from './api/service/event';
import * as userService from './api/service/user';
import configureStore from '../universal/store';
import routes from '../universal/routes';
import DevTools from '../universal/containers/devTools';

const isDev = (process.env.NODE_ENV !== 'production');

export function handleRender(req, res) {
  console.log(' [x] Request for', req.url);
  // Initialize initialState object:
  let initialState = { pulseApp: { userId: 'baseUser' } };

  // Add users to initialState. Can't get users and events at once,
  // because can't do multiple queries and return multiple streams.
  // http://stackoverflow.com/questions/19505469/how-to-get-reponse-of-multiple-queries-in-a-single-rethinkdb-request?rq=1
  userService.getUsers()
  .then(initialUsers => {
    initialState.pulseApp.users = initialUsers;
  })
  .then(() => {
    eventService.getEvents()
    .then(initialEvents => {
      initialState.pulseApp.events = initialEvents;

      const store = configureStore(req, initialState);

      // Wire up routing based upon routes
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
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

        const devTools = (isDev) ? <DevTools /> : null;

        // Render the component to a string
        const html = ReactDOMServer.renderToString(
          <Provider store={store}>
            <div>
              <RouterContext {...renderProps} />
              {devTools}
            </div>
          </Provider>
        );

        // Send the rendered page back to the client with the initial state
        res.render('index', { isProd: (!isDev), html: html, initialState: JSON.stringify(store.getState()) });
      });
    });
  });
}
