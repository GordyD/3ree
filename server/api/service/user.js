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
        io.emit('user-change', change);
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

export function addUser(user) {
  return connect()
  .then(conn => {
    user.created = new Date();
    user.firstName = xss(user.firstName);
    user.lastName = xss(user.lastName);
    user.address1 = xss(user.address1);
    user.address2 = xss(user.address2);
    user.city = xss(user.city);
    user.state = xss(user.state);
    user.zipcode = xss(user.zipcode);
    return r
    .table('users')
    .insert(user).run(conn)
    .then(response => {
      return Object.assign({}, user, {id: response.generated_keys[0]});
    });
  });
}

export function editUser(id, user) {
  return connect()
  .then(conn => {
    user.updated = new Date();
    user.firstName = xss(user.firstName);
    user.lastName = xss(user.lastName);
    user.address1 = xss(user.address1);
    user.address2 = xss(user.address2);
    user.city = xss(user.city);
    user.state = xss(user.state);
    user.zipcode = xss(user.zipcode);
    return r
    .table('users')
    .get(id).update(user).run(conn)
    .then(() => user);
  });
}

export function deleteUser(id) {
  return connect()
  .then(conn => {
    return r
    .table('users')
    .get(id).delete().run(conn)
    .then(() => ({id: id, deleted: true}));
  });
}
