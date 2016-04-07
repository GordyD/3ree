import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function liveUserUpdates(io) {
  console.log('Setting up \'users\' listener...');
  connect()
  .then(conn => {
    r
    .table('users')
    .changes().run(conn, (err, cursor) => {
      console.log('Listening for changes to \'users\' table...');
      cursor.each((err, change) => {
        console.log('Change detected (users table)', change);
        io.emit('event-change', change);
      });
    });
  });
}

export function getUsers() {
  return connect()
  .then(conn => {
    return r
    .table('users').run(conn)
    .then(cursor => cursor.toArray());
  });
}
