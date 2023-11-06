//Call Express package
const express = require('express');

//Invoke router method
const router = express.Router();

//Call controller to router
const controller = require('../controllers/payments.controller')

//Routes
//MERCADO PAGO API
router.post('/api/v1/post/payments/mp/create-order', controller.MPcreate)
router.post('/api/v1/post/payments/mp/success')
router.get('/api/v1/post/payments/mp/failure', controller.MPfail)
router.post('/api/v1/post/payments/mp/pending')
router.post('/api/v1/post/payments/mp/webhook', controller.MPhook)

//STRIPE API
router.post('/api/v1/post/payments/stripe/create-order', controller.SPcreate)
router.post('/api/v1/post/payments/stripe/success', controller.SPupdate)
router.post('/api/v1/post/payments/stripe/delete', controller.SPdelete)

//Export
module.exports = router;