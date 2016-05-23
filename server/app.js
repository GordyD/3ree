import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';

import * as eventService from './api/service/event';
import configureStore from '../universal/store';
import routes from '../universal/routes';
import DevTools from '../universal/containers/devTools';

const isDev = (process.env.NODE_ENV !== 'production');

export function handleRender(req, res) {
  console.log(' [x] Request for', req.url);
  eventService.getEvents()
  .then(initialEvents => {
    let initialState = {pulseApp: { events: initialEvents, userId: 'baseUser'} };

    const store = configureStore(req, initialState);

    // Wire up routing based upon routes
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error || !renderProps)  {

        if (req.url === '/bundle.js') {
          console.log(' | Hold up, are you sure you are hitting the app at http://localhost:3001?');
          console.log(' | On development bundle.js is served by the Webpack Dev Server and so you need to hit the app on port 3001, not port 3000.');
        }
        console.log((error) ? error : 'Error: No matching universal route found');

        res.status(400);
        res.send((error) ? error : 'Error: No matching universal route found');
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
}