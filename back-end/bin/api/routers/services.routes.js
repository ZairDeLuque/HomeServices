//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/services.controller')

//Routes
router.post('/api/v1/post/services/add', controller.add)
router.post('/api/v1/post/services/add/photos', controller.addPics)
router.post('/api/v1/post/services/get/serviceinfo', controller.getInfoService)
router.post('/api/v1/post/services/get/mypublish', controller.isMyPublish)

router.post('/api/v1/post/services/get/tiny/a', controller.paymentA)

//Export
module.exports = router;