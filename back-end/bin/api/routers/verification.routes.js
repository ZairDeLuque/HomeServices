//Call Express package
const express = require('express');
const { checkToken } = require('../../utility/middlewares');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/verification.controller');

//Routes
router.post('/api/v1/post/security/verification/mail', checkToken, controller.newCode)
router.post('/api/v1/post/security/verification/mail/evaluate', controller.evaluateEmail)
router.post('/api/v1/post/security/verification/complete', controller.insertCode)

//Export
module.exports = router;