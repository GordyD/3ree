import * as eventService from './service/event';
import * as userService from './service/user';

// ----------------------------------
// Users
// ----------------------------------
export function getUsers(req, res) {
  eventService.getUsers()
  .then((users) => res.json(users))
  .catch(err => {
    res.status(400);
    res.json({error: err});
  });
}

// ----------------------------------
// Events
// ----------------------------------
export function getEvents(req, res) {
  eventService.getEvents()
  .then((events) => res.json(events))
  .catch(err => {
    res.status(400);
    res.json({error: err});
  });
}

export function addEvent(req, res) {
  eventService.addEvent(req.body)
  .then((event) => res.json(event))
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

export function editEvent(req, res) {
  eventService.editEvent(req.params.id, req.body)
  .then((event) => res.json(event))
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

export function deleteEvent(req, res) {
  eventService.deleteEvent(req.params.id)
  .then((event) => res.json(event))
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

