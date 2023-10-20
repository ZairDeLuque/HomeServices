//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller_DATA = require('../controllers/users.data.controller')

//Routes
router.post('/api/v1/post/user/createcredentials', controller_DATA.create)
router.post('/api/v1/post/user/comparecredentials', controller_DATA.compare)

//Export
module.exports = router;