'use strict'
const express = require('express')
const router = express.Router();
const StationRecordController = require('../controllers/station_record.controller')
const fileController = require('../controllers/file.controller')
const { handlerError } = require('../core/handler.error')
const guard = require('../auth/guard')
const Constants = require('../constants');

router.post('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(fileController.uploadFiles),
    handlerError(StationRecordController.create))
router.get('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(StationRecordController.getList))
router.get('/:station_record_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(StationRecordController.getDetail))
router.put('/:station_record_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(fileController.uploadFiles),
    handlerError(StationRecordController.find),
    handlerError(StationRecordController.edit))
router.delete('/:station_record_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(StationRecordController.find),
    handlerError(StationRecordController.delete))
router.put('/:station_record_id/approve',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(StationRecordController.find),
    handlerError(StationRecordController.approve))

module.exports = router