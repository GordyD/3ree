var context = require.context('./test', true, /.js$/); // Load files in /test with filename matching * .test.js
context.keys().forEach(context);