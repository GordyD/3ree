// From here:
// https://rethinkdb.com/docs/guide/javascript/

// 1. Start Node.js
// `node`

// 2. import the RethinkDB driver
var r = require('rethinkdb');

// Open a connection
r.connect( {host: 'localhost', port: 28015, db: 'pulse'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

// Basic query
r.table('pulses').run(conn, function(err, cursor) {
    cursor.each(console.log);
});

r.table('pulses').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
});

// Example of using "Realtime", in which RethinkDB *pushes* updated query results in realtime.
// Run this, and insert new Pulses, and you'll see the query results update.
r.table('pulses').changes().run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.each(function(err, row) {
        if (err) throw err;
        console.log(JSON.stringify(row, null, 2));
    });
});
