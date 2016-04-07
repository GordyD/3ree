import * as eventService from './service/event';

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

