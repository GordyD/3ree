import React, { PropTypes, Component } from 'react';
import EventInput from './EventInput';

export default class Header extends Component {
  static propTypes = {
    addEvent: PropTypes.func.isRequired
  };

  handleSubmit(event) {
    this.props.addEvent(event);
  }

  render() {
    return (
      <div>
        <header className='header'>
          <h1>Pulse</h1>
        </header>
        <section className='new-event-form'>
          <EventInput onSubmit={::this.handleSubmit} textLabel='What happened?' valueLabel='Rating' />
        </section>
      </div>
    );
  }
}