import app from "./app";
const PORT = 5000;
var http = require('http');

var server = http.createServer(app);

//Creates the server instance
server.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});