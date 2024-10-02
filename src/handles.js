// Import modules
const url = require('url');
const qs = require('querystring');

// Define the HTML content
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello World!</p>' +
'    </body>' +
'</html>';

// Define the server handler function
function serverHandle(req, res) {
  // Parse the URL and query parameters
  const route = url.parse(req.url);
  const path = route.pathname;
  const params = qs.parse(route.query);

  // Log path and query parameters to the console
  console.log('Path:', path);
  console.log('Query Parameters:', params);

  // Respond based on the path and query parameters
  res.writeHead(200, {'Content-Type': 'text/plain'});

  if (path === '/hello' && 'name' in params) {
    res.write('Hello ' + params['name']);
  } else {
    res.write('Hello anonymous');
  }
  
  res.end();
}

// Export the serverHandle function
module.exports = {
  serverHandle
};