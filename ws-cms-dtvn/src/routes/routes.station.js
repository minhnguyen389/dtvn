'use strict'
const express = require('express')
const router = express.Router();
const stationController = require('./../controllers/station.controller')
const { handlerError } = require('./../core/handler.error')
const guard = require('./../auth/guard')
const Constants = require('../constants');

router.post('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(stationController.create))
router.get('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(stationController.getList))
router.get('/by_location',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(stationController.getByLocation))
router.get('/all',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(stationController.getAll))
router.get('/:station_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(stationController.getDetail))
router.put('/:station_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(stationController.find),
    handlerError(stationController.edit))
router.delete('/:station_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(stationController.find),
    handlerError(stationController.delete))
router.put('/:station_id/active',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN]),
    handlerError(stationController.find),
    handlerError(stationController.active))
router.put('/:station_id/download_config',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(stationController.find),
    handlerError(stationController.downloadConfig))
router.put('/:station_id/remove_client',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(stationController.find),
    handlerError(stationController.removeClient))
    router.put('/:station_id/config',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(stationController.find),
    handlerError(stationController.config))
module.exports = router