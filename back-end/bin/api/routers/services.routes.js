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
router.post('/api/v1/post/services/get/uuid', controller.getInfoWithUUID)
router.post('/api/v1/post/services/get/location', controller.getWithLocation)

router.post('/api/v1/post/services/get/sp/all', controller.SPgetAllProducts)
router.post('/api/v1/post/services/get/sp/uncomplete', controller.SPuncomplete)
router.post('/api/v1/post/services/get/sp/delete', controller.deleteReq)

router.post('/api/v1/post/services/purchase/a', controller.shopA)
router.post('/api/v1/post/services/purchase/invoice/data', controller.invoice)

router.post('/api/v1/post/services/purchase/own', controller.ownedA)
router.post('/api/v1/post/services/purchase/own/cancel', controller.ownedB)

router.get('/api/v1/get/services/get/navbar/content', controller.getNavbar)

//Export
module.exports = router;