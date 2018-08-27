const express = require('express');
const router = express.Router();
const satController = require('../controller/satellite.controller');

router.get('/list',satController.getSatelliteList);
router.get('/count',satController.getSatCount)
router.post('/info',satController.getInfo);
router.post('/tm/meta/list',satController.getTMmetaListBySatCode);
router.post('/tc/meta/list',satController.getTCmetaListBySatCode);

module.exports = router;