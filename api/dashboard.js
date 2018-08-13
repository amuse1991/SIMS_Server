const express = require('express');
const router = express.Router();
const dashController = require('../controller/dashboard.controller');


router.get('/',dashController.getDashboardData);

module.exports = router;