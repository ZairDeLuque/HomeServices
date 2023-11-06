//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller_DATA = require('../controllers/users.data.controller')

//Routes
router.post('/api/v1/post/user/createcredentials', controller_DATA.create)
router.post('/api/v1/post/user/comparecredentials', controller_DATA.compare)
router.post('/api/v1/post/user/info/allinformation', controller_DATA.getdata)
router.post('/api/v1/post/user/info/smart/show', controller_DATA.getSmart)

//Export
module.exports = router;