const express = require('express');
const router = express.Router();
const gtdController = require('../controller/gtd.controller');


router.get('/orbitData/:satelliteCode/:time',gtdController.getOrbitData);

module.exports = router;