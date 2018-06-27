const express = require('express');
const router = express.Router();
const rtdController = require('../controller/rtd.controller');


//realTimeData
router.get('/test/connect',rtdController.connectionTest);
router.get('/test/disconnect',rtdController.disconnectionTest);
router.get('/get/telemetry/:id', rtdController.getTelemetry);
router.get('/get/telecommand/:id', rtdController.getTelecommand);

module.exports = router;