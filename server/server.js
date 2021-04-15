const http = require('http');
const express = require('express');
const cors = require('cors');

const colyseus = require('colyseus');
const MyRoom = require('./rooms/my_room.js');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new colyseus.Server({
    server: server,
    express: app
});

gameServer.define('my_room', MyRoom);
gameServer.listen(port);

app.use(express.static(__dirname + "../client"));