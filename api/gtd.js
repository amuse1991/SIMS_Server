const express = require('express');
const router = express.Router();
const gtdController = require('../controller/gtd.controller');


router.get('/orbitData/timeSync',gtdController.getDataReceiveTerm);
router.get('/orbitData/all/:timeString',gtdController.getAllOrbitData);
router.post('/orbitData',gtdController.getOrbitDataBySatCode);

module.exports = router;