import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as eventService from './api/service/event';

import rootReducer from '../universal/reducers';
import PulseApp from '../universal/containers/PulseApp';

export function handleRender(req, res) {
  eventService.getEvents()
  .then(initialEvents => {
    // Create a new Redux store instance
    const store = createStore(rootReducer, {events: initialEvents});

    // Render the component to a string
    const html = React.renderToString(
      <Provider store={store}>
        {() => <PulseApp />}
      </Provider>
    );

    // Send the rendered page back to the client
    res.send(renderFullPage(html, store.getState()));
  });
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Pulse Universal</title>
        <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,200' rel='stylesheet' type='text/css'>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}