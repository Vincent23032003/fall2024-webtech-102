// Import modules
const http = require('http');
const handles = require('./handles');

// Create an HTTP server and pass the handler function from handles.js
const server = http.createServer(handles.serverHandle);

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});