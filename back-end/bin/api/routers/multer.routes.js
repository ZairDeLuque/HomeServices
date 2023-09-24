//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/init.controller')

//Routes
router.post('/uploads/profile', upload.single('archivo'), controller.profile)

//Export
module.exports = router;