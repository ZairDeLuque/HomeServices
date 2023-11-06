const express = require('express');
const router = express.Router();
const socketController = require('../controllers/socket.controller');

// Connect to SocketIO controller
const io = require('socket.io')();

io.on('connection', socketController);

module.exports = router;
