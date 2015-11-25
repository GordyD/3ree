import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PulseApp from './PulseApp';
import * as PulseActions from '../actions/PulseActions';

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
    state => ({
      events: state.pulseApp.events,
      userId: state.pulseApp.userId,
      isWorking: state.pulseApp.isWorking,
      error: state.pulseApp.error
    }), 
    dispatch => bindActionCreators(PulseActions, dispatch)
  )(PulseApp);