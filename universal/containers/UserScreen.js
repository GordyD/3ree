import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserList from '../components/UserList';

import * as PulseActions from '../actions/PulseActions';

class UserScreen extends Component {
  static propTypes = {
    users: React.PropTypes.array,
  };

  render() {
    return (
      <UserList users={this.props.users} />
    );
  }
}

/**
 * Expose "Smart" Component that is subscribed to store updates.
 * https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store
 */
export default connect(
  state => ({
    users: state.pulseApp.users,
  }),
  dispatch => bindActionCreators(PulseActions, dispatch)
)(UserScreen);
