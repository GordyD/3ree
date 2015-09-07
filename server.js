import path from 'path';
import qs from 'qs';
import r from 'rethinkdb';
import bodyParser from 'body-parser';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as api from './api';
import pulseApp from './reducers';
import PulseApp from './containers/PulseApp';

const app = Express();
const port = 3000;

// Use this middleware to serve up static files built into the dist directory
app.use(require('serve-static')(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', handleRender);
app.get('/api/0/events', api.getEvents);
app.post('/api/0/events', api.addEvent);
app.post('/api/0/events/:id', api.editEvent);
app.delete('/api/0/events/:id', api.deleteEvent);

function handleRender(req, res) {
  r.connect({
    host: '192.168.33.18',
    post: 28015,
    db: 'pulse'
  })
  .then(conn => {
    r.table('pulses').orderBy('id').run(conn)
    .then(results =>  {
      results.toArray()
      .then(initialData => {
        // Create a new Redux store instance
        const store = createStore(pulseApp, {events: initialData});

        // Render the component to a string
        const html = React.renderToString(
          <Provider store={store}>
            {() => <PulseApp />}
          </Provider>
        );

        // Send the rendered page back to the client
        res.send(renderFullPage(html, store.getState()));
      });
    });
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

app.listen(port);