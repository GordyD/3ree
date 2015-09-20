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
    res.render('index', { html: html, initialState: JSON.stringify(store.getState()) });
  });
}