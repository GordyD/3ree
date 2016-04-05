import React from 'react';
import { Route, IndexRoute } from 'react-router';

import PulseApp from './containers/PulseApp';
import MyEvents from './containers/MyEvents';
import OtherEvents from './containers/OtherEvents';
import Home from './components/Home';

export default (
  <Route path='/' component={PulseApp}>
    <IndexRoute components={{home: Home}} />
    <Route path='all-events' components={{myEvents: MyEvents, otherEvents: OtherEvents}} />
    <Route path='my-events' components={{myEvents: MyEvents}} />
    <Route path='other-events' components={{otherEvents: OtherEvents}} />
  </Route>
);
