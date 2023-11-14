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
router.post('/api/v1/post/user/subcredentials', controller_DATA.createTwo)
router.post('/api/v1/post/user/comparecredentials', controller_DATA.compare)
router.post('/api/v1/post/user/info/allinformation', controller_DATA.getdata)
router.post('/api/v1/post/user/info/smart/show', controller_DATA.getSmart)
router.post('/api/v1/post/user/info/smart/name', controller_DATA.getName)

//Routes - Users.notifications
router.post('/api/v1/post/user/notifications/get', controller_NOTIFICATIONS.get)
router.post('/api/v1/post/user/notifications/delete', controller_NOTIFICATIONS.delete)
router.post('/api/v1/post/user/notifications/length', controller_NOTIFICATIONS.length)

//Test
router.post('/test/v1/post', controller_DATA.test)

//Export
module.exports = router;