


const {registro} = require('../controllers/controllers.js');
const Router = require('express')

const router = Router();

router.post('/registro', registro);


module.exports = router;