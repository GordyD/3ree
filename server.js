import path from 'path';
import bodyParser from 'body-parser';
import Express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import * as api from './server/api/http';
import * as eventService from './server/api/service/event';
import * as uni from './server/app.js'

const app = Express();
const httpServer = http.Server(app);
const port = 3000;

var io = SocketIO(httpServer);

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

/**
 * Server middleware
 */
app.use(require('serve-static')(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
 * Universal Application endpoint
 */
app.get('/', uni.handleRender);

/**
 * API Endpoints
 */
app.get('/api/0/events', api.getEvents);
app.post('/api/0/events', api.addEvent);
app.post('/api/0/events/:id', api.editEvent);
app.delete('/api/0/events/:id', api.deleteEvent);

eventService.liveUpdates(io);

httpServer.listen(port);