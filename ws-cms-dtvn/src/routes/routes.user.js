'use strict'
const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller')
const { handlerError } = require('../core/handler.error')
const guard = require('../auth/guard');
const Constants = require('../constants');

router.post('/login',
    handlerError(userController.logIn))
router.post('/create_user',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(userController.create))
router.delete('/delete_user/:user_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(userController.find),
    handlerError(userController.delete))
router.get('/user',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(userController.getList))
router.put('/change_pwd',
    handlerError(userController.changePasword))
router.put('/update_location',
    handlerError(userController.updateLocation))
router.put('/reset_pwd',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(userController.find),
    handlerError(userController.resetPasword))

module.exports = router