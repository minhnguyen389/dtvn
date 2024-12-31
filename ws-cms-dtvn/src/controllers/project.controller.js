'use strict'

const { OK } = require('../core/success.reponse')
const { ForbiddenRequestError, NoContentRequestError, BadRequestError } = require("../core/error.response");
const projectModel = require("../models/project.model");
const stationModel = require('../models/station.model');
const fileController = require('./file.controller');
const Constants = require('../constants')

class ProjectController {
    static create = async (req, res) => {
        let payload = req.body;
        if (!payload.name) {
            throw new BadRequestError('Thiếu tên công trình (name)')
        }
        if (!payload.code) {
            throw new BadRequestError('Thiếu mã công trình (code)')
        }

        let project = await projectModel.findOne({ code: payload.code }).lean();
        if (project) {
            throw new BadRequestError('Mã công trình (code) đã tồn tại!')
        }

        let r = await projectModel.create(payload)
        return new OK(r).send(res)
    }

    static getList = async (req, res) => {

        let limit = parseInt(req.query.limit, 10);
        if (isNaN(limit)) {
            limit = 10;
        }

        let offset = parseInt(req.query.offset, 10);
        if (!offset || isNaN(offset)) {
            offset = 0;
        }

        let where = {};

        let name = req.query.name;
        if (name) {
            where.name = {
                $regex: `.*${name}.*`,
                $options: 'i'
            }
        }

        if (req.authorizedPayload.user_group !== 0) where._id = req.authorizedPayload.project_id;

        let r = await projectModel.paginate(where, {
            limit: limit,
            offset: offset
        })
        return new OK(r).send(res)
    }

    static getDetail = async (req, res) => {
        if (!req.project) {
            throw new NoContentRequestError()
        }
        // if (req.authorizedPayload.user_group != Constants.USER_GROUP.SUPER_ADMIN && project_id != req.authorizedPayload.project_id) {
        //     throw new ForbiddenRequestError('Bạn không có quyền truy cập vào thông tin của công trình này!')
        // }
        return new OK(req.project).send(res)
    }

    static find = async (req, res, next) => {
        let project_id = req.params.project_id;
        if (!project_id)
            project_id = req.body.project_id

        if (!project_id) {
            throw new BadRequestError('Thiếu project_id')
        }
        let project = await projectModel.findById(project_id)

        req.project = project
        next()
    }

    static edit = async (req, res) => {

        if (!req.project) {
            throw new NoContentRequestError()
        }

        if (req.authorizedPayload.user_group != Constants.USER_GROUP.SUPER_ADMIN && req.project._id != req.authorizedPayload.project_id) {
            throw new ForbiddenRequestError('Bạn không có quyền truy cập vào thông tin của công trình này!')
        }

        let payload = req.body
        if (payload.name) {
            req.project.name = payload.name
        }

        let project = await projectModel.findOne({ code: payload.code }).lean();

        if (project && req.project.code != project.code) {
            throw new BadRequestError('Mã công trình (code) đã tồn tại!')
        }

        if (payload.code) {
            req.project.code = payload.code
        }

        if (payload.description) {
            req.project.description = payload.description
        }

        if (payload.partners) {
            req.project.partners = payload.partners;
        }
        if (req.project.partners && req.project.partners[0] == '') {
            req.project.partners = [];
        }

        let r = await req.project.save()
        return new OK(r).send(res)
    }

    /**
     * Xóa project cần phải xóa cả các file và photo trên server
     */
    static delete = async (req, res) => {

        if (!req.project) {
            throw new NoContentRequestError()
        }

        //Chỉ cho phép xóa project khi ko còn station nào
        let station = await stationModel.findOne({
            project: req.project._id
        });
        if (station) {
            throw new BadRequestError('Không được phép xóa công trình này, vì còn tồn tại trạm!')
        }

        //xóa các file ảnh và tài liệu
        let listFiles = req.project.files ? req.project.files : [];
        listFiles.push(...req.project.photos);

        fileController.deleteMultiFiles(listFiles)

        let r = await projectModel.deleteOne({
            _id: req.project._id
        })
        return new OK(r).send(res)
    }
    /**
     * upload file
     * nếu ko có project hợp lệ thì xóa các file đã upload
     */
    static addFiles = async (req, res) => {
        if (!req.files || req.files && req.files.length === 0) {
            throw new BadRequestError(`Có lỗi xảy ra (no files), vui lòng thử lại!`)
        }
        if (!req.project) {
            let listFiles = [];
            req.files.forEach(f => listFiles.push(f.filename))
            fileController.deleteMultiFiles(listFiles)
            throw new NoContentRequestError()
        }
        if (!req.project.files) req.project.files = [];
        req.files.forEach(f => {
            req.project.files.push(f.filename)
        });

        let r = await req.project.save();
        return new OK(r).send(res)
    }

    /**
    * upload photo
    * nếu ko có project hợp lệ thì xóa các photo đã upload
    */
    static addPhotos = async (req, res) => {
        if (!req.files || req.files && req.files.length === 0) {
            throw new BadRequestError(`Có lỗi xảy ra (no files), vui lòng thử lại!`)
        }
        if (!req.project) {
            let listFiles = [];
            req.files.forEach(f => listFiles.push(f.filename))
            fileController.deleteMultiFiles(listFiles)
            throw new NoContentRequestError()
        }
        if (!req.project.photos) req.project.photos = [];
        req.files.forEach(f => {
            req.project.photos.push(f.filename)
        });

        let r = await req.project.save();
        return new OK(r).send(res)
    }

    static deleteFile = async (req, res) => {
        if (!req.project) {
            throw new NoContentRequestError()
        }
        let file = req.body.file;
        if (!file) {
            throw new NoContentRequestError()
        }

        fileController.deleteFile(file);
        let farr = req.project.files.filter(f => f !== file);
        req.project.files = farr;

        let r = await req.project.save();
        return new OK(r).send(res)
    }

    static deletePhoto = async (req, res) => {
        if (!req.project) {
            throw new NoContentRequestError()
        }
        let photo = req.body.photo;
        if (!photo) {
            throw new NoContentRequestError()
        }
        fileController.deleteFile(photo);

        let arr = req.project.photos.filter(p => p !== photo);
        req.project.photos = arr;

        let r = await req.project.save();
        return new OK(r).send(res)
    }
}

module.exports = ProjectController