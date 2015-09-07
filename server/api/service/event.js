import r from 'rethinkdb';
import config from '../config.json';

function connect() {
  return r.connect(config);
}

export function getEvents() {
  return connect()
  .then(conn => {
    return r
    .table('pulses')
    .orderBy('id').run(conn)
    .then(cursor => cursor.toArray());
  });
}

export function addEvent(event) {
  return connect()
  .then(conn => {
    return r
    .table('pulses')
    .insert(event).run(conn)
    .then(response => {
      return Object.assign({}, event, {id: response.generated_keys[0]});
    });
  });
}

export function editEvent(id, event) {
  return connect()
  .then(conn => {
    return r
    .table('pulses')
    .get(id).update(event).run(conn)
    .then(() => event);
  });
}

export function deleteEvent(id) {
  return connect()
  .then(conn => {
    return r
    .table('pulses')
    .get(id).delete().run(conn)
    .then(() => ({id: id, deleted: true}));
  });
}