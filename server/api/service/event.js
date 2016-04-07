import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function liveEventUpdates(io) {
  console.log('Setting up \'pulses\' listener...');
  connect()
  .then(conn => {
    r
    .table('pulses')
    .changes().run(conn, (err, cursor) => {
      console.log('Listening for changes to \'pulses\' table...');
      cursor.each((err, change) => {
        console.log('Change detected (pulses table)', change);
        io.emit('event-change', change);
      });
    });
  });
}

export function getEvents() {
  return connect()
  .then(conn => {
    return r
    .table('pulses')
    .orderBy(r.desc('created')).run(conn)
    .then(cursor => cursor.toArray());
  });
}

export function addEvent(event) {
  return connect()
  .then(conn => {
    event.created = new Date();
    event.text = xss(event.text);
    return r
    .table('pulses')
    .insert(event).run(conn)
    .then(response => {
      return Object.assign({}, event, {id: response.generated_keys[0]});
    });
  });
}

export function editEvent(id, event) {
  event.updated = new Date();
  event.text = xss(event.text);
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
