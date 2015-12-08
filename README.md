## 3REE

An example universal JS application written with the 3REE stack, *Re*act + *Re*dux + *Re*thinkDB + *E*xpress. A stack for building apps, front and back end, with just Javascript.

This project was initially conceived to experiment with using these technologies in conjunction with one-another. I have written a [blog](http://blog.workshape.io/the-3ree-stack-react-redux-rethinkdb-express-js/) that relates to this codebase.

This project is useful for:
 - seeing how to build a Universal Javascript application
 - understanding how to handle asyncronousity in Redux action creators
 - seeing how you can use Socket.io with Redux
 - building your own Redux powered application
 - forking so that you can build your own 3REE stack app!

### Main Features

 - Universal (Isomorphic) Javascript
 - Asyncronous example
 - Use of RethinkDB Changefeeds for Realtime

### Setup

You will need to install [RethinkDB](http://www.rethinkdb.com). You can find instruction on how to do so [here](http://rethinkdb.com/docs/install/).

 - Clone the repo `git clone git@github.com:GordyD/3ree.git`
 - Run `npm install`
 - Ensure contents of `server/api/config.json` is correct for your environment.
 - Run `npm run db-setup` to set up DB
 - Run `npm run build` to build application files and watch for changes
 - Run `npm start`
 - Go to http://localhost:3000 in two seperate tabs - see changes propagate in real time.

### Tech Used

 - React - view layer
 - React Router - universal routing
 - Redux - state management
 - RethinkDB - persistance layer
 - Express - server framework
 - Socket.io - for realtime communication between clients and server
 - Webpack - module bundling + build for client
 - Superagent - universal http requests




