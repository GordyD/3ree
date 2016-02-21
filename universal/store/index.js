/* global __DEV__ */

if(typeof window === 'undefined') {
  module.exports = require('./configureStore.server');
} else {
  if (__DEV__) {
    module.exports = require('./configureStore.client.dev');
  } else {
    module.exports = require('./configureStore.client.prod');
  }
}
