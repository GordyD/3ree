import r from 'rethinkdb';

function connect() {
  return r.connect({
    host: '192.168.33.18',
    post: 28015,
    db: 'pulse'
  });
}

export function getEvents(req, res) {
  connect()
  .then(conn => {
    return r.table('pulses').orderBy('id').run(conn)
    .then(cursor => {
      return cursor.toArray()
      .then(results => {
        res.json(results);
      });
    });
  })
  .catch(err => {
    res.status(400);
    res.json({error: err});
  });
}

export function addEvent(req, res) {
  connect()
  .then(conn => {
    return r.table('pulses').insert(req.body).run(conn)
    .then(response => {
      res.json(Object.assign({}, req.body, {id: response.generated_keys[0]}));
    });
  })
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

export function editEvent(req, res) {
  connect()
  .then(conn => {
    return r.table('pulses').get(req.params.id).update(req.body).run(conn)
    .then(response => {
      res.json(req.body);
    });
  })
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

export function deleteEvent(req, res) {
  connect()
  .then(conn => {
    return r.table('pulses').get(req.params.id).delete().run(conn)
    .then(response => {
      console.log('coool');
      res.json({id: req.params.id, deleted: true});
    });
  })
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

