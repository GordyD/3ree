#### NOTES
TODO
Q: why is the serverside rendering issue happening?
Q:

## 3REE
[![Circle CI](https://circleci.com/gh/GordyD/3ree.svg?style=svg)](https://circleci.com/gh/GordyD/3ree)

An example universal JS application written with the 3REE stack, *Re*act + *Re*dux + *Re*thinkDB + *E*xpress. A stack for building apps, front and back end, with just Javascript.

This project was initially conceived to experiment with using these technologies in conjunction with one-another. I have written a [blog](http://blog.workshape.io/the-3ree-stack-react-redux-rethinkdb-express-js/) that relates to this codebase.

![Screenshot](http://i.imgur.com/RiFteKV.png)

This project is useful for:
 - seeing how to build a Universal Javascript application
 - understanding how to handle asyncronousity in Redux action creators
 - seeing how you can use Socket.io with Redux
 - building your own Redux powered application
 - forking so that you can build your own 3REE stack app!

### Main Features

 - Universal (Isomorphic) Javascript
 - Asyncronous Redux actions example
 - Use of RethinkDB Changefeeds for realtime updates reflected in the UI

### Demo

There is a demo app hosted at [3ree-demo.workshape.io](http://3ree-demo.workshape.io). Check it out. If it is down, please email me at gordon@workshape.io

### Setup

You will need to install [RethinkDB](http://www.rethinkdb.com). You can find instruction on how to do so [here](http://rethinkdb.com/docs/install/).

 - Clone the repo `git clone git@github.com:GordyD/3ree.git`
 - Run `npm install`
 - If your local environment is not reflected by `config/default.json`, then add a file at `config/local.json` to provide local customisation.
 - Run `npm run db-setup` to set up DB

### Running Dev Server

 - Run `npm start` will start Webpack dev server - for serving the client, and also start the API server
 - Go to http://localhost:3001 in two seperate tabs - see changes propagate in real time (Hot Module Replacement works too)

### Running Production Server

You will need to roll out your own deployment script for a server, but before you can ship you will need to:

 - Build the client with `npm run build:prod`
 - Ensure all production npm modules are installed on the server. e.g. `npm install --prod`
 - Rsync your application to your server
 - Set up nginx or your web server of choice to map HTTP requests for your URL to `http://localhost:3000`
 - Run `npm run start:prod` to run on your server
 - Go to your URL

### Tech Used

| **Tech** | **Description** | **Version** |
| ---------|-----------------|-------------|
| [React](https://facebook.github.io/react/) | View layer | 0.14.7 |
| [React Router](https://github.com/reactjs/react-router) | Universal routing | 2.0.0 |
| [Redux](http://redux.js.org/) | State management | 3.1.0 |
| [RethinkDB](http://www.rethinkdb.com) | Persistance layer | 2.2.4 |
| [Express](http://expressjs.com/) | Node.js server framework | 4.13.3 |
| [Socket.io]() | Used for realtime communication between clients and server | 1.4.4 |
| [Webpack](https://webpack.github.io/) | Module bundling + build for client | 1.12.11 |
| [Superagent](https://github.com/visionmedia/superagent) | Universal http requests | 1.6.1 |
| [Stylus](http://stylus-lang.com/) | Expressive, dynamic, robust CSS | 0.53.0 |




