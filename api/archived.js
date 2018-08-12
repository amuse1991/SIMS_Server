const express = require('express');
const router = express.Router();
const archivedController = require('../controller/archived.controller');


//archived data
router.get('/telemetry/:tmCode', archivedController.getTelemetry);
router.get('/telecommand/:tcCode', archivedController.getTelecommand);

module.exports = router;