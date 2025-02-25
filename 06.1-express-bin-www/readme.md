## Example of more advanced bin/www file to use with Express.js
The initial default bin/www we use in the lessons is the first example shown below. It is a very basic example that sets up an http server and listens on port 8080.  The second example is a more robust version which will become the final version we use throughout the course.  

### Very basic example of bin/www file
The following will get the job done, setting up an http server and listening on port 8080. It does not handle errors.

```Javascript
var app = require('../app');
var http = require('http');

var port = 8080;

app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('listening', () => {
   console.log("Listening on %s", server.address().port);
});
```

### More advanced example of bin/www file
The following will also get the job done, setting up an http server and listening on port 8080. It has more robust error handling, better logging, and an option to use a different port set via environment variable.

```Javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('express-generated:server');  // provides enhanced logging
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8080');    // if a port is not provided as an environment variable, default to 8080
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

```