'use strict'
const express = require('express')
const router = express.Router();
const LogController = require('../controllers/log.controller')
const { handlerError } = require('../core/handler.error')
const guard = require('../auth/guard')
const Constants = require('../constants');

router.get('/data_log',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(LogController.getListDataLogs))
router.get('/mqtt_log',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN]),
    handlerError(LogController.getListMqttLogs))
router.get('/status_log',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(LogController.getListStatusLogs))

module.exports = router