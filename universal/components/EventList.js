import React, {PropTypes, Component} from 'react';
import EventItem from './EventItem';

export default class EventList extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { events, userId, actions } = this.props;

    const myEvents = events.filter(row => row.userId === userId );
    let list;
    let editable = true;

    let cumulative = myEvents.reduce((x, event) =>  event.value + x, 0);
    let average = (myEvents.length > 0) ? Math.round(cumulative/myEvents.length): 0;

    

    if (myEvents.length > 0) {
      list = myEvents.map((event, key) =>
        <EventItem key={key} row={key} id={event.id} editable={editable} event={event} {...actions} />
      );
    } else {
      list = <li>
        <div className='Pulse-eventItem empty'>
          <p>No events recorded!</p>
        </div>
      </li>;
    }

    return (
      <section className='Pulse-eventList'>
        <div className='Pulse-eventList-summary'>
          <span>Your Events</span>
          <span className='val'>{myEvents.length}</span>
          <span>Avg.</span>
          <span className='val'>{average}</span>
          <span>Cum.</span>
          <span className='val'>{cumulative}</span>
        </div>

        <div className='Pulse-eventList-list'>
          <ul>
            {list}
          </ul>
        </div>
      </section>
    );
  }
}