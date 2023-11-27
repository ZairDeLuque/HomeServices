//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller_DATA = require('../controllers/users.data.controller')
const controller_NOTIFICATIONS = require('../controllers/users.notifications.controller')

//Routes - Users.data
router.post('/api/v1/post/user/createcredentials', controller_DATA.create)
router.post('/api/v1/post/user/sellers/createrequest', controller_DATA.createRequest)
router.post('/api/v1/post/user/sellers/createrequest/photos', controller_DATA.createRequest_Photos)
router.post('/api/v1/post/user/reviews/create', controller_DATA.createReview)
router.post('/api/v1/post/user/sellers/checkrequest', controller_DATA.checkRequest)
router.post('/api/v1/post/user/sellers/already', controller_DATA.allowed)
router.post('/api/v1/post/user/subcredentials', controller_DATA.createTwo)
router.post('/api/v1/post/user/comparecredentials', controller_DATA.compare)
router.post('/api/v1/post/user/info/allinformation', controller_DATA.getdata)
router.post('/api/v1/post/user/info/smart/show', controller_DATA.getSmart)
router.post('/api/v1/post/user/info/smart/name', controller_DATA.getName)
router.post('/api/v1/post/user/info/smart/sub', controller_DATA.getSubCredentials)
router.post('/api/v1/post/user/reviews/get/profile', controller_DATA.getReview_Profile)
router.post('/api/v1/post/user/info/smart/allsells', controller_DATA.getSells)
router.post('/api/v1/post/user/info/smart/location', controller_DATA.getLocation)

//Routes - Users.notifications
router.post('/api/v1/post/user/notifications/get', controller_NOTIFICATIONS.get)
router.post('/api/v1/post/user/notifications/delete', controller_NOTIFICATIONS.delete)
router.post('/api/v1/post/user/notifications/length', controller_NOTIFICATIONS.length)

//Test
router.post('/test/v1/post', controller_DATA.test)

//Export
module.exports = router;