
const http = require('http')
const app = require('./app');
const hostname = 'localhost';
const port = 8086;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});