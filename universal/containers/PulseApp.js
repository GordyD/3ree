import React, { Component } from 'react';
import Header from '../components/Header';
import EventList from '../components/EventList';
import EventTicker from '../components/EventTicker';
import AsyncBar from '../components/AsyncBar';
import EventInput from '../components/EventInput';

import * as PulseActions from '../actions/PulseActions';

export default class PulseApp extends Component {
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
        <section className='Pulse-addEventForm'>
          <EventInput onSubmit={this.props.addEvent} userId={this.props.userId} textLabel='What happened?' valueLabel='Rating' />
        </section>
        <AsyncBar isWorking={this.props.isWorking} error={this.props.error} />
        <EventList events={this.props.events} userId={this.props.userId} actions={actions} />
        <EventTicker events={this.props.events} userId={this.props.userId} length={3} />
      </div>
    );
  }
}
