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
 - seeing how you can use System.import() with React Router + Webpack2 to acheive code splitting for different routes of your application
 - forking so that you can build your own 3REE stack app!

### Main Features

 - Universal (Isomorphic) Javascript Application
 - Use of Webpack 2's Code Splitting and Tree Shaking features
 - Asyncronous Redux actions example
 - Use of RethinkDB Changefeeds for realtime updates reflected in the UI

### Demo

There is a demo app hosted at [3ree-demo.workshape.io](http://3ree-demo.workshape.io). Check it out. If it is down, please email  tanc@workshape.io

### Setup

You will need to install [RethinkDB](http://www.rethinkdb.com). You can find instruction on how to do so [here](http://rethinkdb.com/docs/install/). Make sure you have the latest version installed.

 - Clone the repo `git clone git@github.com:GordyD/3ree.git`
 - Make sure you are using Node v6.0.0 (I recommend using [n](https://github.com/tj/n) for Node version management)
 - Run `npm install`
 - If your local environment is not reflected by `config/default.json`, then add a file at `config/local.json` to provide local customisation.
 - Run `npm run db-setup` to set up DB

### Running Dev Server

On Linux/OSX: `npm start`

On Windows: `npm run start:win`

This will start the Webpack dev server - for serving the client, as well as the server-side API.

Go to http://localhost:3001 in two separate tabs - see changes propagate in real time (Hot Module Replacement works too).

### Running Production Server

You will need to roll out your own deployment script for a server, but before you can ship you will need to:

 - Build the client with `npm run build:prod`
 - Ensure all production npm modules are installed on the server. e.g. `npm install --prod`
 - Rsync your application to your server
 - Set up nginx or your web server of choice to map HTTP requests for your URL to `http://localhost:3000`
 - Run `npm run start:prod` to run on your server
 - Go to your URL

NOTE: Production has not been tested on Windows.

### Tech Used

| **Tech** | **Description** |
| ---------|-----------------|
| [React](https://facebook.github.io/react/) | View layer |
| [React Router](https://github.com/reactjs/react-router) | Universal routing |
| [Redux](http://redux.js.org/) | State management |
| [RethinkDB](http://www.rethinkdb.com) | Persistance layer |
| [Express](http://expressjs.com/) | Node.js server framework |
| [Socket.io]() | Used for realtime communication between clients and server |
| [Webpack](https://webpack.github.io/) | Module bundling + build for client |
| [Superagent](https://github.com/visionmedia/superagent) | Universal http requests |
| [Stylus](http://stylus-lang.com/) | Expressive, dynamic, robust CSS |
