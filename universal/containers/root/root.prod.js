import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

export default class Root extends Component {
  render() {
    const { store, routing } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory}>
            {routing}
          </Router>
        </div>
      </Provider>
    );
  }
};