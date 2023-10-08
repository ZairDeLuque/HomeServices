//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/verification.controller')

//Routes
router.get('/api/security/verification/mail', controller)

//Export
module.exports = router;