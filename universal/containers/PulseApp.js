import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import Header from '../components/Header';
import EventList from '../components/EventList';
import * as PulseActions from '../actions/PulseActions';

export default class PulseApp extends Component {
  render() {
    return (
      <Connector select={state => ({ events : state.events })}>
        {this.renderChild}
      </Connector>
    );
  }

  renderChild({ all, events, dispatch }) {
    const actions = bindActionCreators(PulseActions, dispatch);
    return (
      <div className="pulseContainer">
        <Header addEvent={actions.addEvent} />
        <EventList events={events} actions={actions} />
      </div>
    );
  }
}
