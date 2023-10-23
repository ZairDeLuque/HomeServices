//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/init.controller')

//Routes
router.get('/', controller.main)
router.get('/api/v1/get/status', controller.server)

//Export
module.exports = router;