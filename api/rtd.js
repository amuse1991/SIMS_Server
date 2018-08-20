const express = require('express');
const router = express.Router();
const rtdController = require('../controller/rtd.controller');


//realTimeData(RTD)
router.get('/connect/:rtdType',rtdController.connect);
router.get('/disconnect/:rtdType',rtdController.disconnect);
router.post('/tm/list',rtdController.getTMlistBySatCode);
router.post('/tc/list',rtdController.getTClistBySatCode);

module.exports = router;