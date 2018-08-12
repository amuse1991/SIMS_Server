const express = require('express');
const router = express.Router();
const rtdController = require('../controller/rtd.controller');


//realTimeData(RTD)
router.get('/test/connect',rtdController.connectionTest);
router.get('/test/disconnect',rtdController.disconnectionTest);
router.get('/telemetry/:rtdType', rtdController.getTelemetry);
router.get('/telecommand/:rtdType', rtdController.getTelecommand);

module.exports = router;