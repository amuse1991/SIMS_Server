const express = require('express');
const router = express.Router();
const tmController = require('../controller/tm.controller');


router.post('/meta',tmController.getMeta);
router.post('/archived',tmController.getData);
router.post('/chart/type',tmController.getChartType);
//router.post('/chart/data',tmController.getDataForCharting);

module.exports = router;