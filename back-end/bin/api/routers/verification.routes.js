//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/verification.controller')

//Routes
router.post('/api/v1/post/security/verification/mail', controller.newCode)

//Export
module.exports = router;