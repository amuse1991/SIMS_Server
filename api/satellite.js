const express = require('express');
const router = express.Router();
const satController = require('../controller/satellite.controller');

router.get('/list',satController.getSatelliteList);
router.post('/info',satController.getInfo);
router.post('/tm/nameList',satController.getTMnameListBySatCode);
router.post('/tc/nameList',satController.getTCnameListBySatCode);

module.exports = router;