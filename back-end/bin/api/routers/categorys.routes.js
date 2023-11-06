//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/categorys.controller')

//Routes
router.get('/api/v1/get/categories/all', controller.all)

//Export
module.exports = router;