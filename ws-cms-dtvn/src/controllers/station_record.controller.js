'use strict'

const { ForbiddenRequestError, BadRequestError, NoContentRequestError } = require("../core/error.response");
const { OK } = require("../core/success.reponse");
const stationRecordModel = require("../models/station_record.model");
const stationModel = require("../models/station.model");
const fileController = require('./file.controller');
const projectModel = require("../models/project.model");
var dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
var customParseFormat = require('dayjs/plugin/customParseFormat');
const Constants = require('../constants')

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

class StationRecordController {
    static create = async (req, res) => {
        let payload = req.body;

        if (!payload.content) {
            StationRecordController.deleteFilesIfError(req.files)
            throw new BadRequestError('Thiếu nội dung')
        }
        if (!payload.station_id) {
            throw new BadRequestError('Thiếu trạm (station_id)')
        }

        //Xac dinh station
        let station = await stationModel.findOne({
            _id: payload.station_id
        }).lean();

        if (!station) {
            StationRecordController.deleteFilesIfError(req.files)
            throw new BadRequestError('Trạm không phù hợp (station_id error)!')
        }

        //Kiểm tra trạm có thuộc công trình quản lý không?
        let project = await projectModel.findOne({
            _id: station.project
        }).lean();

        if (!project) {
            StationRecordController.deleteFilesIfError(req.files)
            throw new BadRequestError('Không có công trình quản lý phù hợp!')
        }

        if (req.authorizedPayload.user_group === Constants.USER_GROUP.PROJECT_ADMIN || req.authorizedPayload.user_group === Constants.USER_GROUP.TECHNICIAN) {
            if (req.authorizedPayload.project_id && req.authorizedPayload.project_id != project._id) {
                StationRecordController.deleteFilesIfError(req.files)
                throw new ForbiddenRequestError('Công trình không thuộc quyền quản lý của bạn!')
            }
        }

        payload.station = station._id;

        if (req.files && req.files.length) {
            payload.photos = [];
            req.files.forEach(f => {
                payload.photos.push(f.filename)
            });
        }

        payload.created_by = req.authorizedPayload.uid;

        let r = await stationRecordModel.create(payload)
        return new OK(r).send(res)
    }

    static deleteFilesIfError = (files) => {
        if (files && files.length) {
            let fname = [];
            files.forEach(f => {
                fname.push(f.filename)
            });
            fileController.deleteMultiFiles(fname)
        }
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
        if (req.query.station_id) {
            where.station = req.query.station_id
        }

        let content = req.query.keyword;
        if (content) {
            where.content = {
                $regex: `.*${content}.*`,
                $options: 'i'
            }
        }

        if (req.query.time_start && req.query.time_end) {
            let time_start = dayjs(req.query.time_start)
            let time_end = dayjs(req.query.time_end)

            if (!time_start.isValid() || !time_end.isValid()) {
                throw new BadRequestError('time_start | time_end không hợp lệ!')
            }
            where.created_at = {
                $gte: time_start.toDate(),
                $lte: time_end.toDate()
            }
        }

        let r = await stationRecordModel.paginate(where, {
            sort: { created_at: -1 },
            limit: limit,
            offset: offset,
            populate: ['station', 'created_by']
        })
        return new OK(r).send(res)
    }

    static getDetail = async (req, res) => {
        let station_record_id = req.params.station_record_id

        if (!station_record_id) {
            throw new BadRequestError('Thiếu station_record_id')
        }
        let r = await stationRecordModel.findOne({
            _id: work_record_id
        }).populate('station').lean()

        return new OK(r).send(res)
    }

    static find = async (req, res, next) => {
        let station_record_id = req.params.station_record_id
        if (!station_record_id)
            station_record_id = req.body.station_record_id

        if (!station_record_id) {
            throw new BadRequestError('Thiếu station_record_id')
        }

        let station_record = await stationRecordModel.findById(station_record_id)
        req.station_record = station_record
        next()
    }

    static edit = async (req, res, next) => {

        if (!req.station_record) {
            StationRecordController.deleteFilesIfError(req.files)
            throw new NoContentRequestError()
        }

        if (req.station_record.approval) {
            StationRecordController.deleteFilesIfError(req.files)
            throw new ForbiddenRequestError('Không thể sửa nhật ký đã được phê duyệt!')
        }

        if (req.station_record.created_by != req.authorizedPayload.uid) {
            StationRecordController.deleteFilesIfError(req.files)
            throw new ForbiddenRequestError('Bạn không có quyền sửa nhật ký được tạo bởi người khác!')
        }

        let payload = req.body

        if (payload.content) {
            req.station_record.content = payload.content
        }

        //xử lý ảnh bị xóa nếu có
        if (payload.photos && payload.photos.length) {
            const a = req.station_record.photos;
            const b = payload.photos;

            const bSet = new Set(b);
            const result = a.filter(item => !bSet.has(item));
            fileController.deleteMultiFiles(result)

            req.station_record.photos = payload.photos
        }
        else {
            let listFiles = req.station_record.photos;
            fileController.deleteMultiFiles(listFiles)
            req.station_record.photos = [];
        }
        if (req.files && req.files.length) {
            req.files.forEach(f => {
                req.station_record.photos.push(f.filename)
            });
        }
        let r = await req.station_record.save()
        return new OK(r).send(res)
    }

    static delete = async (req, res) => {
        if (!req.station_record) {
            throw new NoContentRequestError()
        }
        if (req.station_record.approval) {
            throw new ForbiddenRequestError('Không thể xóa nhật ký đã được phê duyệt!')
        }

        if (req.authorizedPayload.user_group == Constants.USER_GROUP.TECHNICIAN && req.station_record.created_by.toString() != req.authorizedPayload.uid) {
            throw new ForbiddenRequestError('Bạn không có quyền xóa nhật ký được tạo bởi người khác!')
        }

        //xóa các file ảnh và tài liệu
        let listFiles = req.station_record.photos;
        fileController.deleteMultiFiles(listFiles)

        let r = await stationRecordModel.deleteOne({
            _id: req.station_record._id
        })
        return new OK(r).send(res)
    }

    // static addPhotos = async (req, res) => {
    //     if (!req.files || req.files && req.files.length === 0) {
    //         throw new BadRequestError(`Có lỗi xảy ra (no files), vui lòng thử lại!`)
    //     }
    //     if (!req.item_record) {
    //         let listFiles = [];
    //         req.files.forEach(f => listFiles.push(f.filename))
    //         fileController.deleteMultiFiles(listFiles)
    //         throw new NoContentRequestError()
    //     }
    //     if (!req.item_record.photos) req.item_record.photos = [];
    //     req.files.forEach(f => {
    //         req.item_record.photos.push(f.filename)
    //     });

    //     let r = await req.item_record.save();
    //     return new OK(r).send(res)
    // }

    // static deletePhoto = async (req, res) => {
    //     if (!req.item_record) {
    //         throw new NoContentRequestError()
    //     }
    //     let photo = req.body.photo;
    //     if (!photo) {
    //         throw new NoContentRequestError()
    //     }
    //     fileController.deleteFiles(photo);

    //     let arr = req.item_record.photos.filter(p => p !== photo);
    //     req.item_record.photos = arr;

    //     let r = await req.item_record.save();
    //     return new OK(r).send(res)
    // }

    static approve = async (req, res) => {
        if (!req.station_record) {
            throw new NoContentRequestError()
        }
        let approval = req.body.approval;
        req.station_record.approval = approval;

        let r = await req.station_record.save();
        return new OK(r).send(res)
    }

}

module.exports = StationRecordController