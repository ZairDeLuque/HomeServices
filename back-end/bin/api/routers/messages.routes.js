//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/messages.controller')

//Routes
router.post('/api/v1/post/messages/rooms/create', controller.create)

//Export
module.exports = router;