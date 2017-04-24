var express = require("express");

var http = require('http');
var fs = require('fs');
var path = require("path");
var debug = require('debug')('nvd-scraper:server');

var app = express();

var index = require("./routes/index");

app.use("/", index);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));

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
    var bind;

    if (error.syscall !== "listen") {
        throw error;
    }

    bind = typeof port === 'string'
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
    debug('Listening on ' + bind);
}

var port = normalizePort(process.env.PORT || '3000');

var server = http.createServer(app);

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);