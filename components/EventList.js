import React, {PropTypes, Component} from 'react';
import EventItem from './EventItem';

export default class EventList extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { events, actions } = this.props;

    let score = events.reduce((x, event) =>  event.value + x, 0);

    return (
      <section>
        <div className='event-summary'>
          <span>Score</span>
          <span className='val'>{score}</span>
          <span>Events</span>
          <span className='val'>{events.length}</span>
        </div>
        <div className='event-list'>
          <ul>
            {events.map(event =>
              <EventItem key={event.id} id={event.id} event={event} {...actions} />
            )}
          </ul>
        </div>
      </section>
    );
  }
}