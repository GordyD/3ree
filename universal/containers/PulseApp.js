import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import EventList from '../components/EventList';
import EventTicker from '../components/EventTicker';
import AsyncBar from '../components/AsyncBar';
import EventInput from '../components/EventInput';

import * as PulseActions from '../actions/PulseActions';

class PulseApp extends Component {
  static propTypes = {
    addEvent: React.PropTypes.func.isRequired,
    editEvent: React.PropTypes.func.isRequired,
    deleteEvent: React.PropTypes.func.isRequired,
    userId: React.PropTypes.string,
    events: React.PropTypes.array,
    isWorking: React.PropTypes.bool,
    error: React.PropTypes.any,
  };

  render() {
    let actions = {
      editEvent: this.props.editEvent,
      deleteEvent: this.props.deleteEvent
    };

    return (
      <div className="Pulse-Container">
        <Header/>
        {this.props.home}
        {this.props.userScreen}
        <div>
          <section className='Pulse-addEventForm'>
            <EventInput onSubmit={this.props.addEvent} userId={this.props.userId} textLabel='What happened?' valueLabel='Rating' />
          </section>
          <AsyncBar isWorking={this.props.isWorking} error={this.props.error} />
          {this.props.myEvents}
          {this.props.otherEvents}
        </div>
      </div>
    );
  }
}

/**
 * Expose "Smart" Component that decorates PulseApp with `state` and the PulseActions' `actionCreators`.
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
