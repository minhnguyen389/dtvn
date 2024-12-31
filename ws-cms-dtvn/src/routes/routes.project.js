'use strict'
const express = require('express')
const router = express.Router();
const projectController = require('./../controllers/project.controller')
const fileController = require('../controllers/file.controller')
const { handlerError } = require('../core/handler.error')
const guard = require('../auth/guard')
const Constants = require('../constants');

router.post('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN]),
    handlerError(projectController.create))
router.get('/',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN, Constants.USER_GROUP.TECHNICIAN]),
    handlerError(projectController.getList))
router.get('/:project_id',
    handlerError(projectController.find),
    handlerError(projectController.getDetail))
router.put('/:project_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN]),
    handlerError(projectController.find),
    handlerError(projectController.edit))
router.delete('/:project_id',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN]),
    handlerError(projectController.find),
    handlerError(projectController.delete))
router.put('/:project_id/add_files',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(fileController.uploadFiles),
    handlerError(projectController.find),
    handlerError(projectController.addFiles))
router.put('/:project_id/add_photos',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(fileController.uploadFiles),
    handlerError(projectController.find),
    handlerError(projectController.addPhotos))
router.put('/:project_id/delete_file',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(projectController.find),
    handlerError(projectController.deleteFile))
router.put('/:project_id/delete_photo',
    guard.checkUserGroup([Constants.USER_GROUP.SUPER_ADMIN, Constants.USER_GROUP.PROJECT_ADMIN]),
    handlerError(projectController.find),
    handlerError(projectController.deletePhoto))

module.exports = router