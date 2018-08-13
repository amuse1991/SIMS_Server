const express = require('express');
const router = express.Router();
const tcController = require('../controller/tc.controller');

router.post('/meta',tcController.getMeta);
router.post('/archived',tcController.getData);
router.post('/chart/type',tcController.getChartType);


module.exports = router;