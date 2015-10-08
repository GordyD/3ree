import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PulseApp from './PulseApp';
import * as PulseActions from '../actions/PulseActions';

function mapStateToProps(state) {
  return {
    events: state.events,
    userId: state.userId,
    isWorking: state.isWorking,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PulseActions, dispatch);
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(mapStateToProps, mapDispatchToProps)(PulseApp);