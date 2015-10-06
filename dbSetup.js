import r from 'rethinkdb';
import config from './server/api/config.json';

let DATABASE = config.db || 'pulse';
let TABLE = 'pulses';


r.connect(config)
.then(conn => {
  return getDbList(conn)
  .then((list) => {
    return dropDbIfExists(conn, list)
    .then(() => {
      return createDatabase(conn);
    })
    .then(() => {
      return createTable(conn);
    })
    .then(() => {
      return closeConnection(conn);
    });
  })
});


function getDbList(conn) {
  return r.dbList().run(conn);
}

function dropDbIfExists(conn, dbList) {
  if(dbList.indexOf(DATABASE) >= 0) {
      console.log(' [-] Drop Database...');
      return r.dbDrop(DATABASE).run(conn);
  } else {
      return Promise.resolve(true);
  }
}

function createDatabase(conn) {
  console.log(' [-] Create Database');
  return r.dbCreate(DATABASE).run(conn);
}

function createTable(conn) {
  console.log(' [-] Create Table');
  return r.db(DATABASE).tableCreate(TABLE).run(conn);
}

function closeConnection(conn) {
  console.log(' [-] Close connection!');
  return conn.close();
}