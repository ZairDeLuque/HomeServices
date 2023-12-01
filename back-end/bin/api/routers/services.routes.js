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
router.get('/api/v1/post/services/get/topmain', controller.getTopMain)
router.get('/api/v1/post/services/get/news', controller.getNewMain)
router.get('/api/v1/post/services/get/today', controller.getNewMain)

router.post('/api/v1/post/services/get/sp/all', controller.SPgetAllProducts)
router.post('/api/v1/post/services/get/sp/tops', controller.SPgetTops)
router.post('/api/v1/post/services/get/sp/uncomplete', controller.SPuncomplete)
router.post('/api/v1/post/services/get/sp/small', controller.getSmartData)
router.post('/api/v1/post/services/get/sp/delete', controller.deleteReq)
router.post('/api/v1/post/services/get/sp/next', controller.SPnext)
router.post('/api/v1/post/services/post/sp/cancel', controller.SPcancel)

router.post('/api/v1/post/services/purchase/invitation/confirm', controller.invitation)
router.post('/api/v1/post/services/purchase/invitation/itsme', controller.invitation2)

router.post('/api/v1/post/services/purchase/a', controller.shopA)
router.post('/api/v1/post/services/purchase/invoice/data', controller.invoice)

router.post('/api/v1/post/services/purchase/own', controller.ownedA)
router.post('/api/v1/post/services/purchase/own/cancel', controller.ownedB)

router.get('/api/v1/get/services/get/navbar/content', controller.getNavbar)

router.post('/api/v1/post/services/get/search', controller.searchWithFilter)

//Export
module.exports = router;