import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import Header from '../components/Header';
import EventList from '../components/EventList';
import EventTicker from '../components/EventTicker';
import AsyncBar from '../components/AsynCBar';
import EventInput from '../components/EventInput';

import * as PulseActions from '../actions/PulseActions';

export default class PulseApp extends Component {
  render() {
    return (
      <Connector select={state => ({ events : state.events, userId: state.userId, isWorking: state.isWorking, error: state.error })}>
        {this.renderChild}
      </Connector>
    );
  }

  renderChild({ all, events, userId, isWorking, error, dispatch }) {
    const actions = bindActionCreators(PulseActions, dispatch);
    return (
      <div className="Pulse-Container">
        <Header/>
        <section className='Pulse-addEventForm'>
          <EventInput onSubmit={actions.addEvent} userId={userId} textLabel='What happened?' valueLabel='Rating' />
        </section>
        <AsyncBar isWorking={isWorking} error={error} />
        <EventList events={events} userId={userId} actions={actions} />
        <EventTicker events={events} userId={userId} length={3} actions={actions} />
      </div>
    );
  }
}
