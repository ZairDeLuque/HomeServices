//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/comentary.controller')

//Routes
router.post('/api/v1/post/comentary/create', controller.create)
router.post('/api/v1/post/comentary/get', controller.get)

//Export
module.exports = router;