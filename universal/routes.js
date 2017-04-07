import React from 'react';
import { Route, IndexRoute } from 'react-router';
import PulseApp from './containers/PulseApp';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

/* global System */
/* global Promise */
export default (
  <Route path='/' component={PulseApp}>
    <IndexRoute 
      getComponents={(location, cb) =>
        Promise.all([
          System.import('./containers/MyEvents'),
          System.import('./containers/OtherEvents'),
        ])
        .then(modules => cb(null, {myEvents: modules[0].default, otherEvents: modules[1].default}))
        .catch(errorLoading)
      }
    />
    <Route 
      path='my-events'
      getComponents={(location, cb) =>
        System
          .import('./containers/MyEvents')
          .then(module => cb(null, {myEvents: module.default}))
          .catch(errorLoading)
      }
    />
    <Route 
      path='other-events' 
      getComponents={(location, cb) =>
        System
          .import('./containers/OtherEvents')
          .then(module => cb(null, {otherEvents: module.default}))
          .catch(errorLoading)
      } 
    />
  </Route>
);