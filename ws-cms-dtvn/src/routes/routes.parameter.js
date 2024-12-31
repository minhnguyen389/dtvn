'use strict'
const express = require('express')
const router = express.Router();
const parameterController = require('../controllers/parameter.controller')
const { handlerError } = require('../core/handler.error')
const guard = require('../auth/guard')
const Constants = require('../constants');

router.post('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(parameterController.create))
router.get('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(parameterController.getList))
router.get('/:parameter_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(parameterController.getDetail))
router.put('/:parameter_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(parameterController.find),
    handlerError(parameterController.edit))
router.delete('/:parameter_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(parameterController.find),
    handlerError(parameterController.delete))
router.put('/:parameter_id/config',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(parameterController.find),
    handlerError(parameterController.config))
module.exports = router