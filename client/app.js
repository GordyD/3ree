import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { getOrSetUserId } from './UserId';
import { setupRealtime } from './Realtime';

import routes from '../universal/routes';
import store from '../universal/store';
import * as actions from '../universal/actions/PulseActions';

import Root from '../universal/containers/root';

import '../style/pure.css';
import '../style/main.styl';
import '../style/spinner.styl';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root store={store} routing={routes} history={history} />,
  document.getElementById('app')
);

// Now that we have rendered...
setupRealtime(store, actions);

// lets mutate state and set UserID as key from local storage
store.dispatch(actions.setUserId(getOrSetUserId()));
