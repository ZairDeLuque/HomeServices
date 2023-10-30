//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller_LOC = require('../controllers/locations.controller')

//Routes
router.get('/api/v1/get/locations/obtainPublicIP', controller_LOC.search)

//Export
module.exports = router;