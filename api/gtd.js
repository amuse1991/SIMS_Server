const express = require('express');
const router = express.Router();
const gtdController = require('../controller/gtd.controller');


router.get('/orbitData/all',gtdController.getAllOrbitData);
router.post('/orbitData',gtdController.getOrbitDataBySatCode);

module.exports = router;